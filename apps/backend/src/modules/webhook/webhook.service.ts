import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DisasterDtoType, DisasterType } from '@wfp-dmp/interfaces';

import { generateTelegramMessage } from './telegram';

const telegramPcdmChatId = process.env.TELEGRAM_PCDM_CHAT_ID;
const telegramNcdmChatId = process.env.TELEGRAM_NCDM_CHAT_ID;

@Injectable()
export class WebhookService {
  constructor(private readonly httpService: HttpService) {}

  async sendTelegramMessage(chatId: string, text: string) {
    console.log(text);
    const {
      data: { ok },
    } = await this.httpService.axiosRef.post<{ ok: boolean }>('sendMessage', {
      chat_id: chatId,
      text: text,
      parse_mode: 'markdown',
    });

    if (!ok) throw new HttpException('Telegram Error', HttpStatus.INTERNAL_SERVER_ERROR);

    return ok;
  }

  async sendAlerts(disasterType: DisasterType, form: DisasterDtoType) {
    if (telegramPcdmChatId === undefined) {
      throw new Error('telegramPcdmChatId is not defined');
    }
    if (telegramNcdmChatId === undefined) {
      throw new Error('telegramNcdmChatId is not defined');
    }

    const text = generateTelegramMessage(disasterType, form);

    await Promise.all([
      this.sendTelegramMessage(telegramPcdmChatId, text),
      this.sendTelegramMessage(telegramNcdmChatId, text),
    ]);

    return 'sent';
  }
}
