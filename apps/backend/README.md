<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[travis-image]: https://api.travis-ci.org/nestjs/nest.svg?branch=master
[travis-url]: https://travis-ci.org/nestjs/nest
[linux-image]: https://img.shields.io/travis/nestjs/nest/master.svg?label=linux
[linux-url]: https://travis-ci.org/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="blank">Node.js</a> framework for building efficient and scalable server-side applications, heavily inspired by <a href="https://angular.io" target="blank">Angular</a>.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/dm/@nestjs/core.svg" alt="NPM Downloads" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://api.travis-ci.org/nestjs/nest.svg?branch=master" alt="Travis" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://img.shields.io/travis/nestjs/nest/master.svg?label=linux" alt="Linux" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#5" alt="Coverage" /></a>
<a href="https://gitter.im/nestjs/nestjs?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=body_badge"><img src="https://badges.gitter.im/nestjs/nestjs.svg" alt="Gitter" /></a>
<a href="https://opencollective.com/nest#backer"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec"><img src="https://img.shields.io/badge/Donate-PayPal-dc3d53.svg"/></a>
  <a href="https://twitter.com/nestframework"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

Fill `KOBO_TOKEN`, `FLOOD_ASSET_ID`, `DROUGHT_ASSET_ID`, `INCIDENT_ASSET_ID` in `.env.example.rc` and `.env.test.rc`.

```bash
# Install dependencies
pnpm install
# Create local env file
cp .env.example.rc .env.rc
```

## Running the app

```bash
# Start database
docker compose up -d

# Execute migrations
pnpm migration:run

# Start dev server
pnpm dev
```

## Test

```bash
# unit tests
pnpm test

# test coverage
pnpm test:coverage
```

## Migrations

```bash
# Generate a migration
pnpm migration:generate migration/YourMigrationName

# Run all pending migrations
pnpm migration:run
```

## Telegram notifications

### Create a Telegram bot

- To create a bot follow this [tutorial](https://core.telegram.org/bots/tutorial).
  Keep in a safe place its associated token.

- In the Telegram app, add the bot to the channels in which it will send alerts

- To get those channel ids:

```sh
curl https://api.telegram.org/bot<BOT_TOKEN>/getUpdates
```

(replace <BOT_TOKEN> by the real token)
If you cannot see the chat ids, remove the bot from the channels and add it again in the chats and run the command again

You can now fill out `/wfp/dmp/telegram/telegramNcdmChatId`, `/wfp/dmp/telegram/telegramPcdmChatId` and `/wfp/dmp/telegram/telegramBotToken` in the AWS Secret Manager.

### Kobo Webhook settings

To setup the Telegram notifications when a new form is available:

Check first that the telegram secrets `/wfp/dmp/telegram/telegramNcdmChatId`, `/wfp/dmp/telegram/telegramPcdmChatId` and `/wfp/dmp/telegram/telegramBotToken` have been setup in the AWS Secret Manager.

- In Kobo, for each form:
  - Go to `SETTINGS`
  - Click on `REST Services` and then on `REGISTER A NEW SERVICE`
  - Add:
    - A name
    - An endpoint URL: `<Environment backend URL>/webhook/<FLOOD or DROUGHT or INCIDENT>`
    - A custom http Headers `authorization` : `Bearer <dmpWebhookToken from the AWS SecretManager>`
  - Click on `CREATE`

![](images/kobo_rest_services.png)
![](images/kobo_rest_services_webhook.png)
