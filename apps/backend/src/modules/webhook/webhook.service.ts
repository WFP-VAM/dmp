import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DisasterDtoType, DisasterType } from '@wfp-dmp/interfaces';

import { generateTelegramMessage } from './telegram';

const telegramPcdmChatId = process.env.TELEGRAM_PCDM_CHAT_ID;
const telegramNcdmChatId = process.env.TELEGRAM_NCDM_CHAT_ID;

@Injectable()
export class WebhookService {
  constructor(private readonly httpService: HttpService) {}

  private isAxiosErrorWithResponse(error: unknown): error is {
    response: { status: number; statusText: string; data: unknown };
  } {
    return (
      typeof error === 'object' &&
      error !== null &&
      'response' in error &&
      typeof (error as { response: unknown }).response === 'object' &&
      (error as { response: unknown }).response !== null
    );
  }

  private isAxiosErrorWithRequest(error: unknown): error is { message?: string } {
    return (
      typeof error === 'object' && error !== null && 'request' in error && !('response' in error)
    );
  }

  private handleTelegramError(error: unknown, chatId: string): never {
    // Log detailed error information
    if (this.isAxiosErrorWithResponse(error)) {
      // Axios error with response
      console.error('Telegram API Error:', {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data,
        chatId: chatId,
      });
      throw new HttpException(
        `Telegram API Error: ${error.response.status} - ${JSON.stringify(error.response.data)}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    if (this.isAxiosErrorWithRequest(error)) {
      // Axios error without response (network error)
      const errorMessage = error.message ?? 'Network error';
      console.error('Telegram Network Error:', errorMessage);
      throw new HttpException(
        `Telegram Network Error: ${errorMessage}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    // Other error
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('Telegram Error:', errorMessage);
    throw error instanceof HttpException
      ? error
      : new HttpException(`Telegram Error: ${errorMessage}`, HttpStatus.INTERNAL_SERVER_ERROR);
  }

  async sendTelegramMessage(chatId: string, text: string) {
    console.log(text);
    try {
      const {
        data: { ok },
      } = await this.httpService.axiosRef.post<{ ok: boolean }>('sendMessage', {
        chat_id: chatId,
        text: text,
        parse_mode: 'markdown',
      });

      if (!ok) throw new HttpException('Telegram Error', HttpStatus.INTERNAL_SERVER_ERROR);

      return ok;
    } catch (error: unknown) {
      this.handleTelegramError(error, chatId);
    }
  }

  private logAlertError(error: unknown, form: DisasterDtoType): void {
    console.log('Form data:', JSON.stringify(form));

    // Log detailed error information
    if (error instanceof Error) {
      console.error('Error sending alerts:', {
        message: error.message,
        stack: error.stack,
        name: error.name,
      });

      return;
    }
    if (this.isAxiosErrorWithResponse(error)) {
      // Axios error with response
      console.error('Error sending alerts:', {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data,
      });

      return;
    }
    console.error('Error sending alerts:', error);
  }

  async sendAlerts(disasterType: DisasterType, form: DisasterDtoType) {
    try {
      if (telegramPcdmChatId === undefined) {
        throw new Error('telegramPcdmChatId is not defined');
      }
      if (telegramNcdmChatId === undefined) {
        throw new Error('telegramNcdmChatId is not defined');
      }

      const text = generateTelegramMessage(disasterType, form);

      await Promise.all([
        this.sendTelegramMessage(telegramNcdmChatId, text),
        // TODO: Uncomment this when the PCDM chat is ready and tested
        // this.sendTelegramMessage(telegramPcdmChatId, text),
      ]);

      return 'sent';
    } catch (error: unknown) {
      this.logAlertError(error, form);

      // Re-throw if it's already an HttpException, otherwise wrap it
      if (error instanceof HttpException) {
        throw error;
      }
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new HttpException(
        `Failed to send alerts: ${errorMessage}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
