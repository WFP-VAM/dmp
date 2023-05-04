import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';

import { Certificate } from './certificate';
import Database from './database';
import { ECSService } from './ecs-service';
import { Route53Record } from './route53-record';
import { NestVpc } from './vpc';

const DBNAME = 'nestdb';

const ALLOWED_HOST = process.env.ALLOWED_HOST ?? '';
if (ALLOWED_HOST === '') throw 'Missing ALLOWED_HOST env';

interface NestProps {
  stage: string;
  applicationName: string;
}

class NestStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps & NestProps) {
    super(scope, id, props);

    const { applicationName, stage } = props;

    const vpc = new NestVpc(this, NestVpc.name, {});

    const hostedZoneDomainName = this.node.tryGetContext(
      'hostedZoneDomainName',
    ) as string;

    // To update if we want some sub domains
    const domainName = hostedZoneDomainName;

    const database = new Database(this, Database.name, {
      applicationName,
      vpc: vpc.vpc,
      dbName: DBNAME,
      stage,
    });

    const certificate = new Certificate(this, Certificate.name, {
      hostedZoneDomainName,
      domainName,
    });

    const ecsServiceStack = new ECSService(this, ECSService.name, {
      certificate: certificate.certificate,
      dbHostname: database.dbCluster.clusterEndpoint.hostname.toString(),
      dbPort: database.dbCluster.clusterEndpoint.port.toString(),
      dbName: DBNAME,
      dbSecret: database.dbSecret,
      vpc: vpc.vpc,
      applicationName,
      allowedHost: ALLOWED_HOST,
      stage,
    });

    new Route53Record(this, Route53Record.name, {
      hostedZoneDomainName,
      loadBalancer: ecsServiceStack.loadBalancer,
    });
  }
}

export { NestStack };
