#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import 'source-map-support/register';

import { NestStack } from '../lib/nestStack';

const DEFAULT_REGION = process.env.CDK_DEFAULT_REGION;
const DEFAULT_ACCOUNT = process.env.CDK_DEFAULT_ACCOUNT;
const STAGE = process.env.STAGE ?? '';

if (DEFAULT_REGION === undefined) throw 'Missing CDK_DEFAULT_REGION env';
if (DEFAULT_ACCOUNT === undefined) throw 'Missing CDK_DEFAULT_ACCOUNT env';
if (!['staging', 'production'].includes(STAGE))
  throw 'STAGE env should be equal to staging or production';

const applicationName = 'wfpdmp';

const stackName = `${applicationName}Stack-${STAGE}`;

const app = new cdk.App();
new NestStack(app, stackName, {
  stackName,
  env: { account: DEFAULT_ACCOUNT, region: DEFAULT_REGION },
  applicationName,
  stage: STAGE,
});
