import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';

import { Certificate } from './certificate';
import Database from './database';
import { ECSService } from './ecs-service';
import { Route53Record } from './route53-record';
import { NestVpc } from './vpc';

const ALLOWED_HOST = process.env.ALLOWED_HOST ?? '';
if (ALLOWED_HOST === '') throw 'Missing ALLOWED_HOST env';

class NestStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const applicationName = this.node.tryGetContext(
      'applicationName',
    ) as string;
    const hostedZoneDomainName = this.node.tryGetContext(
      'hostedZoneDomainName',
    ) as string;

    const vpc = new NestVpc(this, NestVpc.name, {
      applicationName,
    });

    // To update if we want some sub domains
    const domainName = hostedZoneDomainName;

    const database = new Database(this, Database.name, {
      applicationName,
      vpc: vpc.vpc,
      dbName: `${applicationName}db`,
    });

    const certificate = new Certificate(this, Certificate.name, {
      hostedZoneDomainName,
      domainName,
      applicationName,
    });

    const ecsServiceStack = new ECSService(this, ECSService.name, {
      certificate: certificate.certificate,
      dbHostname: database.dbCluster.clusterEndpoint.hostname.toString(),
      dbPort: database.dbCluster.clusterEndpoint.port.toString(),
      dbName: `${applicationName}db`,
      dbSecret: database.dbSecret,
      vpc: vpc.vpc,
      applicationName,
      allowedHost: ALLOWED_HOST,
    });

    new Route53Record(this, Route53Record.name, {
      hostedZoneDomainName,
      applicationName,
      loadBalancer: ecsServiceStack.loadBalancer,
    });
  }
}

export { NestStack };
