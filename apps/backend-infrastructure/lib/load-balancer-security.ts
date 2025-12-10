import {
  aws_elasticloadbalancingv2,
  NestedStack,
  NestedStackProps,
  RemovalPolicy,
  Stack,
} from 'aws-cdk-lib';
import {
  ApplicationLoadBalancer,
  IApplicationLoadBalancer,
} from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import { Effect, PolicyStatement, ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import { Bucket, BucketEncryption } from 'aws-cdk-lib/aws-s3';
import {
  CfnLoggingConfiguration,
  CfnWebACL,
  CfnWebACLAssociation,
} from 'aws-cdk-lib/aws-wafv2';
import { Construct } from 'constructs';

export interface LoadBalancerSecurityProps extends NestedStackProps {
  loadBalancer: IApplicationLoadBalancer;
  applicationName: string;
}

export class LoadBalancerSecurity extends NestedStack {
  constructor(scope: Construct, id: string, props: LoadBalancerSecurityProps) {
    super(scope, id, props);

    const { loadBalancer, applicationName } = props;
    const stack = Stack.of(this);

    // ============================================
    // ALB Access Logs Configuration
    // ============================================

    // Create S3 bucket for ALB access logs
    const albLogsBucket = new Bucket(this, 'AlbLogsBucket', {
      bucketName: `${applicationName.toLowerCase()}-alb-access-logs-${
        stack.account
      }-${stack.region}`,
      encryption: BucketEncryption.S3_MANAGED,
      removalPolicy: RemovalPolicy.RETAIN,
      autoDeleteObjects: false,
    });

    // Grant ELB service permission to write to the bucket
    albLogsBucket.addToResourcePolicy(
      new PolicyStatement({
        sid: 'AllowELBServiceToWriteLogs',
        effect: Effect.ALLOW,
        principals: [new ServicePrincipal('logdelivery.elb.amazonaws.com')],
        actions: ['s3:PutObject'],
        resources: [`${albLogsBucket.bucketArn}/*`],
      }),
    );

    // Enable access logging on the Application Load Balancer
    if (loadBalancer instanceof ApplicationLoadBalancer) {
      loadBalancer.logAccessLogs(albLogsBucket, `${applicationName}-alb-logs`);
    } else {
      // Fallback: use CfnLoadBalancer attributes if interface doesn't support logAccessLogs
      const cfnLoadBalancer = loadBalancer.node
        .defaultChild as aws_elasticloadbalancingv2.CfnLoadBalancer;
      if (cfnLoadBalancer) {
        cfnLoadBalancer.loadBalancerAttributes = [
          ...(cfnLoadBalancer.loadBalancerAttributes || []),
          {
            key: 'access_logs.s3.enabled',
            value: 'true',
          },
          {
            key: 'access_logs.s3.bucket',
            value: albLogsBucket.bucketName,
          },
          {
            key: 'access_logs.s3.prefix',
            value: `${applicationName}-alb-logs`,
          },
        ];
      }
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

    // Create S3 bucket for WAF logs
    const wafLogsBucket = new Bucket(this, 'WafLogsBucket', {
      bucketName: `${applicationName.toLowerCase()}-waf-logs-${stack.account}-${
        stack.region
      }`,
      encryption: BucketEncryption.S3_MANAGED,
      removalPolicy: RemovalPolicy.RETAIN,
      autoDeleteObjects: false,
    });

    // Grant WAF service permission to write to the bucket
    wafLogsBucket.addToResourcePolicy(
      new PolicyStatement({
        sid: 'AllowWAFServiceToWriteLogs',
        effect: Effect.ALLOW,
        principals: [new ServicePrincipal('delivery.logs.amazonaws.com')],
        actions: ['s3:PutObject'],
        resources: [`${wafLogsBucket.bucketArn}/*`],
        conditions: {
          StringEquals: {
            's3:x-amz-acl': 'bucket-owner-full-control',
          },
        },
      }),
    );

    // Enable WAF logging
    new CfnLoggingConfiguration(this, 'WafLoggingConfiguration', {
      resourceArn: webAcl.attrArn,
      logDestinationConfigs: [wafLogsBucket.bucketArn],
    });
  }
}
