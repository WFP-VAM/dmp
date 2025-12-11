/* eslint-disable max-lines */
import {
  aws_elasticloadbalancingv2,
  NestedStack,
  NestedStackProps,
} from 'aws-cdk-lib';
import { ICertificate } from 'aws-cdk-lib/aws-certificatemanager';
import { IVpc } from 'aws-cdk-lib/aws-ec2';
import {
  Cluster,
  ContainerImage,
  Secret as ecs_Secret,
} from 'aws-cdk-lib/aws-ecs';
import { ApplicationLoadBalancedFargateService } from 'aws-cdk-lib/aws-ecs-patterns';
import { IApplicationLoadBalancer } from 'aws-cdk-lib/aws-elasticloadbalancingv2';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { ISecret, Secret } from 'aws-cdk-lib/aws-secretsmanager';
import { Construct } from 'constructs';
import path = require('path');

import { LoadBalancerSecurity } from './load-balancer-security';

export interface ECSServiceProps extends NestedStackProps {
  vpc: IVpc;
  dbSecret: ISecret;
  certificate: ICertificate;
  dbName: string;
  dbHostname: string;
  dbPort: string;
  applicationName: string;
  allowedHost: string;
}

export class ECSService extends NestedStack {
  public readonly loadBalancer: IApplicationLoadBalancer;

  constructor(scope: Construct, id: string, props: ECSServiceProps) {
    super(scope, id, props);

    const {
      vpc,
      dbSecret,
      dbHostname,
      dbName,
      dbPort,
      certificate,
      applicationName,
      allowedHost,
    } = props;

    const nestSecret = new Secret(this, 'nestSecret', {
      secretName: `${applicationName}-nest-secret`,

      generateSecretString: {
        secretStringTemplate: JSON.stringify({}),
        generateStringKey: 'NestKey',
        excludePunctuation: true,
      },
    });

    const superadminUsername = new Secret(this, 'superadminUser', {
      secretName: `${applicationName}/SuperadminUsername`,
      generateSecretString: {
        excludeUppercase: true,
        excludePunctuation: true,
        passwordLength: 8,
      },
    });
    const superadminPassword = new Secret(this, 'superadminPassword', {
      secretName: `${applicationName}/SuperadminPassword`,
      generateSecretString: {
        passwordLength: 12,
      },
    });

    const adminjsCookieSecret = new Secret(this, 'adminjsCookieSecret', {
      secretName: `${applicationName}/AdminjsCookieSecret`,
    });

    const adminjsSessionSecret = new Secret(this, 'adminjsSessionSecret', {
      secretName: `${applicationName}/AdminjsSessionSecret`,
    });

    const koboToken = Secret.fromSecretNameV2(
      this,
      'koboToken',
      `${applicationName}/kobo/token`,
    );

    const floodAssetId = Secret.fromSecretNameV2(
      this,
      'koboFloodAssetId',
      `${applicationName}/kobo/floodAssetId`,
    );

    const incidentAssetId = Secret.fromSecretNameV2(
      this,
      'koboIncidentAssetId',
      `${applicationName}/kobo/incidentAssetId`,
    );

    const droughtAssetId = Secret.fromSecretNameV2(
      this,
      'koboDroughtAssetId',
      `${applicationName}/kobo/droughtAssetId`,
    );

    const webhookToken = new Secret(this, 'webhookToken', {
      secretName: `${applicationName}/kobo/WebhookToken`,
    });

    const telegramBotToken = Secret.fromSecretNameV2(
      this,
      'telegramBotToken',
      `${applicationName}/telegram/telegramBotToken`,
    );

    const telegramPcdmChatId = Secret.fromSecretNameV2(
      this,
      'telegramPcdmChatId',
      `${applicationName}/telegram/telegramPcdmChatId`,
    );

    const telegramNcdmChatId = Secret.fromSecretNameV2(
      this,
      'telegramNcdmChatId',
      `${applicationName}/telegram/telegramNcdmChatId`,
    );

    const cluster = new Cluster(this, 'Cluster', { vpc });
    const loadBalancedService = new ApplicationLoadBalancedFargateService(
      this,
      'FargateService',
      {
        cluster,
        desiredCount: 1,
        minHealthyPercent: 0,
        maxHealthyPercent: 200,
        taskImageOptions: {
          secrets: {
            POSTGRES_USER: ecs_Secret.fromSecretsManager(dbSecret, 'username'),
            POSTGRES_PASSWORD: ecs_Secret.fromSecretsManager(
              dbSecret,
              'password',
            ),
            SECRET_KEY: ecs_Secret.fromSecretsManager(nestSecret, 'NestKey'),
            SUPERADMIN_USERNAME:
              ecs_Secret.fromSecretsManager(superadminUsername),
            SUPERADMIN_PASSWORD:
              ecs_Secret.fromSecretsManager(superadminPassword),
            ADMINJS_COOKIE_SECRET:
              ecs_Secret.fromSecretsManager(adminjsCookieSecret),
            ADMINJS_SESSION_SECRET:
              ecs_Secret.fromSecretsManager(adminjsSessionSecret),
            KOBO_TOKEN: ecs_Secret.fromSecretsManager(koboToken),
            FLOOD_ASSET_ID: ecs_Secret.fromSecretsManager(floodAssetId),
            INCIDENT_ASSET_ID: ecs_Secret.fromSecretsManager(incidentAssetId),
            DROUGHT_ASSET_ID: ecs_Secret.fromSecretsManager(droughtAssetId),
            WEBHOOK_TOKEN: ecs_Secret.fromSecretsManager(webhookToken),
            TELEGRAM_BOT_TOKEN: ecs_Secret.fromSecretsManager(telegramBotToken),
            TELEGRAM_PCDM_CHAT_ID:
              ecs_Secret.fromSecretsManager(telegramPcdmChatId),
            TELEGRAM_NCDM_CHAT_ID:
              ecs_Secret.fromSecretsManager(telegramNcdmChatId),
          },
          image: ContainerImage.fromAsset(
            path.join(__dirname, '..', '..', '..'),
            { file: path.join('apps', 'backend', 'Dockerfile') },
          ),
          containerPort: 8000,
          environment: {
            POSTGRES_DATABASE: dbName,
            POSTGRES_HOST: dbHostname,
            POSTGRES_PORT: dbPort,
            NODE_ENV: 'production',
            SERVER_PORT: '8000',
            TYPEORM_ENTITIES: 'dist/**/*.entity.js',
            TYPEORM_MIGRATIONS: 'migration/*.js',
            TYPEORM_SYNCHRONIZE: 'false',
            ALLOWED_HOST: allowedHost,
          },
        },
        certificate,
        publicLoadBalancer: true,
        protocol: aws_elasticloadbalancingv2.ApplicationProtocol.HTTPS,
        redirectHTTP: true,
      },
    );

    loadBalancedService.targetGroup.setAttribute(
      'deregistration_delay.timeout_seconds',
      '20',
    );

    const policyStatement = new PolicyStatement({
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      resources: [dbSecret.secretFullArn!, nestSecret.secretFullArn!],
      actions: ['secretsmanager:GetSecretValue'],
    });

    loadBalancedService.taskDefinition.addToExecutionRolePolicy(
      policyStatement,
    );

    this.loadBalancer = loadBalancedService.loadBalancer;

    // Configure security: WAF, ALB access logs, and WAF logging
    new LoadBalancerSecurity(this, 'LoadBalancerSecurity', {
      loadBalancer: this.loadBalancer,
      applicationName,
    });
  }
}
