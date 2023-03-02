import { Aspects, NestedStack, NestedStackProps } from 'aws-cdk-lib';
import {
  InstanceType,
  IVpc,
  Peer,
  Port,
  SecurityGroup,
  SubnetType,
} from 'aws-cdk-lib/aws-ec2';
import {
  AuroraPostgresEngineVersion,
  CfnDBCluster,
  Credentials,
  DatabaseCluster,
  DatabaseClusterEngine,
  IDatabaseCluster,
} from 'aws-cdk-lib/aws-rds';
import { ISecret, Secret } from 'aws-cdk-lib/aws-secretsmanager';
import { Construct } from 'constructs';

interface DatabaseProps extends NestedStackProps {
  vpc: IVpc;
  applicationName: string;
  dbName: string;
}

class Database extends NestedStack {
  public readonly dbCluster: IDatabaseCluster;
  public readonly dbSecret: ISecret;
  public readonly dbName: string;

  constructor(scope: Construct, id: string, props: DatabaseProps) {
    super(scope, id, props);
    const { vpc, applicationName, dbName } = props;
    this.dbName = dbName;
    const dbSecurityGroup = new SecurityGroup(this, 'DBClusterSecurityGroup', {
      vpc,
    });

    vpc.privateSubnets.forEach(privateSubnet => {
      dbSecurityGroup.addIngressRule(
        Peer.ipv4(privateSubnet.ipv4CidrBlock),
        Port.tcp(5432),
      );
    });

    dbSecurityGroup.addIngressRule(
      Peer.ipv4(vpc.privateSubnets[0].ipv4CidrBlock),
      Port.tcp(5432),
    );

    this.dbSecret = new Secret(this, 'DBCredentialsSecret', {
      secretName: `${dbName}-credentials`,
      generateSecretString: {
        secretStringTemplate: JSON.stringify({
          username: applicationName,
        }),
        excludePunctuation: true,
        includeSpace: false,
        generateStringKey: 'password',
      },
    });

    this.dbCluster = new DatabaseCluster(this, 'DbCluster', {
      engine: DatabaseClusterEngine.auroraPostgres({
        version: AuroraPostgresEngineVersion.VER_14_5,
      }),
      instances: 1,

      credentials: Credentials.fromPassword(
        this.dbSecret.secretValueFromJson('username').unsafeUnwrap(),
        this.dbSecret.secretValueFromJson('password'),
      ),
      defaultDatabaseName: this.dbName,

      instanceProps: {
        vpc: vpc,
        instanceType: new InstanceType('serverless'),
        autoMinorVersionUpgrade: true,
        securityGroups: [dbSecurityGroup],
        vpcSubnets: vpc.selectSubnets({
          subnetType: SubnetType.PRIVATE_ISOLATED,
        }),
      },
      port: 5432,
    });

    Aspects.of(this.dbCluster).add({
      // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
      visit(node) {
        if (node instanceof CfnDBCluster) {
          node.serverlessV2ScalingConfiguration = {
            minCapacity: 0.5,
            maxCapacity: 1,
          };
        }
      },
    });
  }
}

export default Database;
