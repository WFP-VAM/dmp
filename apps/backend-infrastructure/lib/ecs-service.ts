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

export interface ECSServiceProps extends NestedStackProps {
  vpc: IVpc;
  dbSecret: ISecret;
  certificate: ICertificate;
  dbName: string;
  dbHostname: string;
  dbPort: string;
  applicationName: string;
  allowedHost: string;
  stage: string;
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
      stage,
    } = props;

    const stageApplicationName = `${applicationName}-${stage}`;

    const nestSecret = new Secret(this, 'nestSecret', {
      secretName: `${stageApplicationName}-nest-secret`,

      generateSecretString: {
        secretStringTemplate: JSON.stringify({}),
        generateStringKey: 'NestKey',
        excludePunctuation: true,
      },
    });

    const superadminUsername = new Secret(this, 'superadminUser', {
      secretName: `${stageApplicationName}-Superadmin-Username`,
      generateSecretString: {
        excludeUppercase: true,
        excludePunctuation: true,
        passwordLength: 8,
      },
    });
    const superadminPassword = new Secret(this, 'superadminPassword', {
      secretName: `${stageApplicationName}-Superadmin-Password`,
      generateSecretString: {
        passwordLength: 12,
      },
    });

    const adminjsCookieSecret = new Secret(this, 'adminjsCookieSecret', {
      secretName: `${stageApplicationName}-AdminjsCookieSecret`,
    });

    const adminjsSessionSecret = new Secret(this, 'adminjsSessionSecret', {
      secretName: `${stageApplicationName}-AdminjsSessionSecret`,
    });

    const koboSecret = Secret.fromSecretNameV2(
      this,
      'koboSecret',
      `/${applicationName}/${stage}/kobo`,
    );

    const webhookToken = new Secret(this, 'webhookToken', {
      secretName: `${stageApplicationName}-WebhookToken`,
    });

    const telegramSecret = Secret.fromSecretNameV2(
      this,
      'telegramSecret',
      `/${applicationName}/${stage}/telegram`,
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
            KOBO_TOKEN: ecs_Secret.fromSecretsManager(koboSecret, 'token'),
            FLOOD_ASSET_ID: ecs_Secret.fromSecretsManager(
              koboSecret,
              'floodAssetId',
            ),
            INCIDENT_ASSET_ID: ecs_Secret.fromSecretsManager(
              koboSecret,
              'incidentAssetId',
            ),
            DROUGHT_ASSET_ID: ecs_Secret.fromSecretsManager(
              koboSecret,
              'droughtAssetId',
            ),
            WEBHOOK_TOKEN: ecs_Secret.fromSecretsManager(webhookToken),
            TELEGRAM_BOT_TOKEN: ecs_Secret.fromSecretsManager(
              telegramSecret,
              'botToken',
            ),
            TELEGRAM_PCDM_CHAT_ID: ecs_Secret.fromSecretsManager(
              telegramSecret,
              'pcdmChatId',
            ),
            TELEGRAM_NCDM_CHAT_ID: ecs_Secret.fromSecretsManager(
              telegramSecret,
              'ncdmChatId',
            ),
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
  }
}
