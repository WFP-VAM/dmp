import { RemovalPolicy, Stack } from 'aws-cdk-lib';
import {
  ApplicationLoadBalancer,
  IApplicationLoadBalancer,
} from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import { Effect, PolicyStatement, ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import { LogGroup, RetentionDays } from 'aws-cdk-lib/aws-logs';
import { Bucket, BucketEncryption } from 'aws-cdk-lib/aws-s3';
import {
  CfnLoggingConfiguration,
  CfnWebACL,
  CfnWebACLAssociation,
} from 'aws-cdk-lib/aws-wafv2';
import { Construct } from 'constructs';

export interface LoadBalancerSecurityProps {
  loadBalancer: IApplicationLoadBalancer;
  applicationName: string;
}

export class LoadBalancerSecurity extends Construct {
  constructor(scope: Construct, id: string, props: LoadBalancerSecurityProps) {
    super(scope, id);

    const { loadBalancer, applicationName } = props;
    const stack = Stack.of(this);

    // ============================================
    // ALB Access Logs Configuration
    // ============================================

    // Create S3 bucket for ALB access logs
    // Note: Using auto-generated bucket name to avoid conflicts with existing buckets
    // from previous failed deployments
    const albLogsBucket = new Bucket(this, 'AlbLogsBucket', {
      encryption: BucketEncryption.S3_MANAGED,
      removalPolicy: RemovalPolicy.RETAIN,
      autoDeleteObjects: false,
    });

    // Enable access logging on the Application Load Balancer
    // ApplicationLoadBalancedFargateService always creates an ApplicationLoadBalancer,
    // so logAccessLogs should always be available
    // Note: logAccessLogs() automatically configures the bucket policy for ELB service
    if (loadBalancer instanceof ApplicationLoadBalancer) {
      loadBalancer.logAccessLogs(albLogsBucket, `${applicationName}-alb-logs`);
    } else {
      // Fallback: if for some reason we don't have ApplicationLoadBalancer,
      // manually configure bucket policy and log a warning
      albLogsBucket.addToResourcePolicy(
        new PolicyStatement({
          sid: 'AllowELBServiceToWriteLogs',
          effect: Effect.ALLOW,
          principals: [new ServicePrincipal('logdelivery.elb.amazonaws.com')],
          actions: ['s3:PutObject'],
          resources: [`${albLogsBucket.bucketArn}/*`],
        }),
      );
      console.warn(
        'Load balancer is not an ApplicationLoadBalancer instance. Access logs may not be configured.',
      );
    }

    // ============================================
    // WAF Configuration
    // ============================================

    // Create WAF WebACL
    const webAcl = new CfnWebACL(this, 'WebACL', {
      name: `${applicationName}-waf`,
      scope: 'REGIONAL',
      defaultAction: {
        allow: {},
      },
      rules: [
        // AWS Managed Rules - Common Rule Set
        {
          name: 'AWSManagedRulesCommonRuleSet',
          priority: 1,
          overrideAction: { none: {} },
          statement: {
            managedRuleGroupStatement: {
              vendorName: 'AWS',
              name: 'AWSManagedRulesCommonRuleSet',
            },
          },
          visibilityConfig: {
            sampledRequestsEnabled: true,
            cloudWatchMetricsEnabled: true,
            metricName: 'CommonRuleSetMetric',
          },
        },
        // AWS Managed Rules - Known Bad Inputs
        {
          name: 'AWSManagedRulesKnownBadInputsRuleSet',
          priority: 2,
          overrideAction: { none: {} },
          statement: {
            managedRuleGroupStatement: {
              vendorName: 'AWS',
              name: 'AWSManagedRulesKnownBadInputsRuleSet',
            },
          },
          visibilityConfig: {
            sampledRequestsEnabled: true,
            cloudWatchMetricsEnabled: true,
            metricName: 'KnownBadInputsMetric',
          },
        },
        // AWS Managed Rules - Linux Operating System
        {
          name: 'AWSManagedRulesLinuxRuleSet',
          priority: 3,
          overrideAction: { none: {} },
          statement: {
            managedRuleGroupStatement: {
              vendorName: 'AWS',
              name: 'AWSManagedRulesLinuxRuleSet',
            },
          },
          visibilityConfig: {
            sampledRequestsEnabled: true,
            cloudWatchMetricsEnabled: true,
            metricName: 'LinuxRuleSetMetric',
          },
        },
        // AWS Managed Rules - SQL Injection
        {
          name: 'AWSManagedRulesSQLiRuleSet',
          priority: 4,
          overrideAction: { none: {} },
          statement: {
            managedRuleGroupStatement: {
              vendorName: 'AWS',
              name: 'AWSManagedRulesSQLiRuleSet',
            },
          },
          visibilityConfig: {
            sampledRequestsEnabled: true,
            cloudWatchMetricsEnabled: true,
            metricName: 'SQLiRuleSetMetric',
          },
        },
      ],
      visibilityConfig: {
        sampledRequestsEnabled: true,
        cloudWatchMetricsEnabled: true,
        metricName: `${applicationName}-waf-metric`,
      },
    });

    // Associate WAF with the Application Load Balancer
    new CfnWebACLAssociation(this, 'WebACLAssociation', {
      resourceArn: loadBalancer.loadBalancerArn,
      webAclArn: webAcl.attrArn,
    });

    // ============================================
    // WAF Logging Configuration
    // ============================================

    // Create CloudWatch Logs group for WAF logs
    // Using CloudWatch Logs instead of S3 because WAF S3 logging has ARN format issues
    // CloudWatch Logs is simpler, more reliable, and integrates better with AWS services
    const wafLogGroup = new LogGroup(this, 'WafLogGroup', {
      logGroupName: `/aws/waf/${applicationName}`,
      retention: RetentionDays.ONE_MONTH,
      removalPolicy: RemovalPolicy.RETAIN,
    });

    // Grant WAF service permission to write to the log group
    wafLogGroup.addToResourcePolicy(
      new PolicyStatement({
        sid: 'AllowWAFServiceToWriteLogs',
        effect: Effect.ALLOW,
        principals: [new ServicePrincipal('delivery.logs.amazonaws.com')],
        actions: ['logs:CreateLogStream', 'logs:PutLogEvents'],
        resources: [wafLogGroup.logGroupArn],
        conditions: {
          StringEquals: {
            'aws:SourceAccount': stack.account,
          },
          ArnLike: {
            'aws:SourceArn': `arn:aws:logs:${stack.region}:${stack.account}:*`,
          },
        },
      }),
    );

    // Enable WAF logging to CloudWatch Logs
    new CfnLoggingConfiguration(this, 'WafLoggingConfiguration', {
      resourceArn: webAcl.attrArn,
      logDestinationConfigs: [wafLogGroup.logGroupArn],
    });
  }
}
