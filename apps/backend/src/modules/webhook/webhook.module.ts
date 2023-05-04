import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { WebhookController } from './webhook.controller';
import { WebhookService } from './webhook.service';

const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
if (telegramBotToken === undefined) {
  throw new Error('telegramBotToken is not defined');
}

@Module({
  imports: [
    HttpModule.register({
      baseURL: `https://api.telegram.org/bot${telegramBotToken}/`,
    }),
  ],
  controllers: [WebhookController],
  providers: [WebhookService],
})
export class WebhookModule {}
