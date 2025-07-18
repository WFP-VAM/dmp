#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import 'source-map-support/register';

import { NestStack } from '../lib/nestStack';

const DEFAULT_REGION = process.env.CDK_DEFAULT_REGION;
const DEFAULT_ACCOUNT = process.env.CDK_DEFAULT_ACCOUNT;

if (DEFAULT_REGION === undefined) throw 'Missing CDK_DEFAULT_REGION env';
if (DEFAULT_ACCOUNT === undefined) throw 'Missing CDK_DEFAULT_ACCOUNT env';

const app = new cdk.App();
const applicationName = app.node.tryGetContext('applicationName') as string;

new NestStack(app, `${applicationName}NestStack`, {
  stackName: `${applicationName}NestStack`,
  env: { account: DEFAULT_ACCOUNT, region: DEFAULT_REGION },
});
