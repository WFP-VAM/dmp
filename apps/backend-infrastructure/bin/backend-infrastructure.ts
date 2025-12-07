#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import 'source-map-support/register';

import { NestStack } from '../lib/nestStack';

const DEFAULT_REGION = process.env.CDK_DEFAULT_REGION;
const DEFAULT_ACCOUNT = process.env.CDK_DEFAULT_ACCOUNT;

if (DEFAULT_REGION === undefined) throw 'Missing CDK_DEFAULT_REGION env';
if (DEFAULT_ACCOUNT === undefined) throw 'Missing CDK_DEFAULT_ACCOUNT env';

const app = new cdk.App();
const rawApplicationName = app.node.tryGetContext('applicationName') as string;

// Sanitize applicationName to be safe for all AWS resource names
// - RDS database names must begin with a letter and contain only alphanumeric characters
// - CloudFormation stack names can have hyphens, but we sanitize for consistency
function sanitizeApplicationName(name: string): string {
  if (!name) {
    throw new Error('applicationName context is required');
  }
  
  // Remove all non-alphanumeric characters
  let sanitized = name.replace(/[^a-zA-Z0-9]/g, '').substring(0, 60);
  
  // If empty after sanitization, use default
  if (!sanitized) {
    sanitized = 'app';
  }
  
  // Ensure it starts with a letter (required for RDS and other AWS resources)
  const sanitizedName = /^[a-zA-Z]/.test(sanitized)
    ? sanitized
    : `app${sanitized}`;
  
  return sanitizedName;
}

const applicationName = sanitizeApplicationName(rawApplicationName);

if (rawApplicationName !== applicationName) {
  console.warn(
    `⚠️  applicationName sanitized from "${rawApplicationName}" to "${applicationName}"`,
  );
}

console.log(
  `Deploying ${applicationName} to: ${DEFAULT_REGION} (${DEFAULT_ACCOUNT})`,
);

// Set sanitized applicationName as context (overriding the original)
app.node.setContext('applicationName', applicationName);

new NestStack(app, `${applicationName}NestStack`, {
  stackName: `${applicationName}NestStack`,
  env: { account: DEFAULT_ACCOUNT, region: DEFAULT_REGION },
});
