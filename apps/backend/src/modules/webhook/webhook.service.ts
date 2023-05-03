import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DisasterDtoType, DisasterType, formatCommonFields } from '@wfp-dmp/interfaces';

const telegramPcdmChatId = process.env.TELEGRAM_PCDM_CHAT_ID;
const telegramNcdmChatId = process.env.TELEGRAM_NCDM_CHAT_ID;
// Refactor not to use ALLOWED_HOST
const frontendUrl = process.env.ALLOWED_HOST;

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
    if (frontendUrl === undefined) {
      throw new Error('frontendUrl is not defined');
    }

    const commonFields = formatCommonFields(form);
    const text = `New ${disasterType.toLowerCase()} form reported by _${
      commonFields.entryName
    }_ : [form](${new URL(commonFields.approvalLink, frontendUrl).toString()})`;

    await Promise.all([
      this.sendTelegramMessage(telegramPcdmChatId, text),
      this.sendTelegramMessage(telegramNcdmChatId, text),
    ]);

    return 'sent';
  }
}
