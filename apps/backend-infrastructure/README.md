# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

- `npm run build` compile typescript to js
- `npm run watch` watch for changes and compile
- `npm run test` perform the jest unit tests
- `cdk deploy` deploy this stack to your default AWS account/region
- `cdk diff` compare deployed stack with current state
- `cdk synth` emits the synthesized CloudFormation template

## Deploy the Backend

The backend is deployed on AWS thanks to the CDK.

To deploy the backend:

- Set `/${applicationName}/kobo/token`, `/${applicationName}/kobo/floodAssetId`, `/${applicationName}/kobo/incidentAssetId`, `/${applicationName}/kobo/droughtAssetId`, `/${applicationName}/telegram/telegramNcdmChatId`, `/${applicationName}/telegram/telegramPcdmChatId` and `/${applicationName}/telegram/telegramBotToken` in the AWS Secret Manager.

- Set `CDK_DEFAULT_REGION`, `CDK_DEFAULT_ACCOUNT`, `ALLOWED_HOST` as environment variables.

- Run

  ```bash
  pnpm cdk deploy --profile <aws-profile> --context applicationName="<app-name>" --context hostedZoneDomainName="<domain-name>"
  ```

  where:

  - <aws-profile> is your local aws profile
  - <app-name> is the application name used by the CDK
  - <domain-name> is the main domain name to use

For more information check [here](https://www.notion.so/m33/Kobo-Deployment-52c5bacbf4214eb9ac2156ac94de032e)

## Deployment CI
Set all necessary secrets and variables. Here are some examples

### Secrets:
ALLOWED_HOST=staging.dmp.ovio.org
APPLICATION_NAME=test
AWS_ACCOUNT=246724672
AWS_ROLE_ARN
DOMAIN_NAME=staging-api.dmp.ovio.org

### Variables
AWS_REGION=us-east-1

**Note:** `${applicationName}` should match the value you use for the `applicationName` context (e.g., `staging-dmp`, `production-dmp`). This ensures secrets are namespaced per environment.
