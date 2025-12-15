/* eslint-disable max-lines */
import { Stack } from 'aws-cdk-lib';
import {
  ApplicationLoadBalancer,
  CfnLoadBalancer,
  IApplicationLoadBalancer,
} from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import {
  CfnLoggingConfiguration,
  CfnWebACL,
  CfnWebACLAssociation,
} from 'aws-cdk-lib/aws-wafv2';
import { Construct } from 'constructs';

export interface LoadBalancerSecurityProps {
  loadBalancer: IApplicationLoadBalancer;
  applicationName: string;
  /**
   * Centralized S3 bucket name for ALB access logs (region-specific)
   * If not provided, will be determined from CDK context or defaults based on region
   */
  albLogsBucketName?: string;
  /**
   * Centralized S3 bucket ARN for WAF logs (region-specific)
   * If not provided, will be determined from CDK context or defaults based on region
   */
  wafLogsBucketArn?: string;
}

export class LoadBalancerSecurity extends Construct {
  private static readonly SUPPORTED_REGIONS = ['eu-west-1', 'eu-central-1'];

  private static isLoggingSupported(region: string): boolean {
    return LoadBalancerSecurity.SUPPORTED_REGIONS.includes(region);
  }

  private static getContextValue(
    stack: Stack,
    contextKey: string,
  ): string | undefined {
    const value = stack.node.tryGetContext(contextKey) as unknown;

    return typeof value === 'string' ? value : undefined;
  }

  // eslint-disable-next-line complexity
  constructor(scope: Construct, id: string, props: LoadBalancerSecurityProps) {
    super(scope, id);

    const {
      loadBalancer,
      applicationName,
      albLogsBucketName,
      wafLogsBucketArn,
    } = props;
    const stack = Stack.of(this);
    const region = stack.region;

    // Centralized logging buckets for TECI/Sentinel integration
    // Only configure logging for supported regions: eu-west-1 and eu-central-1
    // Note: Bucket names/ARNs must be configured via CDK context to avoid exposing
    // organizational details in open source code:
    //   --context albLogsBucketName="your-bucket-name"
    //   --context wafLogsBucketArn="arn:aws:s3:::your-bucket-name"
    const isLoggingSupported = LoadBalancerSecurity.isLoggingSupported(region);

    // ============================================
    // ALB Access Logs Configuration
    // ============================================

    if (isLoggingSupported) {
      // Use centralized S3 bucket for ALB access logs
      // Bucket name must be provided via props or CDK context
      const contextAlbLogsBucketName = LoadBalancerSecurity.getContextValue(
        stack,
        'albLogsBucketName',
      );
      const resolvedAlbLogsBucketName =
        albLogsBucketName ?? contextAlbLogsBucketName;

      if (
        resolvedAlbLogsBucketName === undefined ||
        resolvedAlbLogsBucketName === ''
      ) {
        throw new Error(
          `ALB logs bucket name must be configured via CDK context: --context albLogsBucketName="your-bucket-name"`,
        );
      }

      // Reference existing centralized bucket
      const albLogsBucket = Bucket.fromBucketName(
        this,
        'AlbLogsBucket',
        resolvedAlbLogsBucketName,
      );

      // Enable access logging on the Application Load Balancer
      if (loadBalancer instanceof ApplicationLoadBalancer) {
        loadBalancer.logAccessLogs(
          albLogsBucket,
          `${applicationName}-alb-logs`,
        );
      } else {
        // Fallback: manually configure via CfnLoadBalancer attributes
        const cfnLoadBalancer = loadBalancer.node.defaultChild as
          | CfnLoadBalancer
          | undefined;
        if (cfnLoadBalancer !== undefined) {
          const existingAttributes = Array.isArray(
            cfnLoadBalancer.loadBalancerAttributes,
          )
            ? cfnLoadBalancer.loadBalancerAttributes
            : [];
          cfnLoadBalancer.loadBalancerAttributes = [
            ...existingAttributes,
            {
              key: 'access_logs.s3.enabled',
              value: 'true',
            },
            {
              key: 'access_logs.s3.bucket',
              value: resolvedAlbLogsBucketName,
            },
            {
              key: 'access_logs.s3.prefix',
              value: `${applicationName}-alb-logs`,
            },
          ];
        }
      }
    } else {
      console.warn(
        `ALB access logging not configured: region ${region} is not supported. Supported regions: ${LoadBalancerSecurity.SUPPORTED_REGIONS.join(
          ', ',
        )}`,
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

    if (isLoggingSupported) {
      // Use centralized S3 bucket for WAF logs
      // Bucket ARN must be provided via props or CDK context
      const contextWafLogsBucketArn = LoadBalancerSecurity.getContextValue(
        stack,
        'wafLogsBucketArn',
      );
      const resolvedWafLogsBucketArn =
        wafLogsBucketArn ?? contextWafLogsBucketArn;

      if (
        resolvedWafLogsBucketArn === undefined ||
        resolvedWafLogsBucketArn === ''
      ) {
        throw new Error(
          `WAF logs bucket ARN must be configured via CDK context: --context wafLogsBucketArn="arn:aws:s3:::your-bucket-name"`,
        );
      }

      // Enable WAF logging to centralized S3 bucket
      new CfnLoggingConfiguration(this, 'WafLoggingConfiguration', {
        resourceArn: webAcl.attrArn,
        logDestinationConfigs: [resolvedWafLogsBucketArn],
      });
    } else {
      console.warn(
        `WAF logging not configured: region ${region} is not supported. Supported regions: ${LoadBalancerSecurity.SUPPORTED_REGIONS.join(
          ', ',
        )}`,
      );
    }
  }
}
