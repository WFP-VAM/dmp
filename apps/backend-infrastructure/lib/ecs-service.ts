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
    } = props;

    const nestSecret = new Secret(this, 'nestSecret', {
      secretName: `${applicationName}-nest-secret`,

      generateSecretString: {
        secretStringTemplate: JSON.stringify({}),
        generateStringKey: 'NestKey',
        excludePunctuation: true,
      },
    });

    const cluster = new Cluster(this, 'Cluster', { vpc });
    const loadBalancedService = new ApplicationLoadBalancedFargateService(
      this,
      'FargateService',
      {
        cluster,
        taskImageOptions: {
          secrets: {
            POSTGRES_USER: ecs_Secret.fromSecretsManager(dbSecret, 'username'),
            POSTGRES_PASSWORD: ecs_Secret.fromSecretsManager(
              dbSecret,
              'password',
            ),
            SECRET_KEY: ecs_Secret.fromSecretsManager(nestSecret, 'NestKey'),
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
            ALLOWED_HOST: 'http://localhost:3000',
          },
        },
        certificate,
        publicLoadBalancer: true,
        protocol: aws_elasticloadbalancingv2.ApplicationProtocol.HTTPS,
        redirectHTTP: true,
      },
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
