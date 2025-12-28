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
      // Log detailed error information
      if (error && typeof error === 'object' && 'response' in error) {
        // Axios error with response
        const axiosError = error as {
          response: { status: number; statusText: string; data: unknown };
        };
        console.error('Telegram API Error:', {
          status: axiosError.response.status,
          statusText: axiosError.response.statusText,
          data: axiosError.response.data,
          chatId: chatId,
        });
        throw new HttpException(
          `Telegram API Error: ${axiosError.response.status} - ${JSON.stringify(
            axiosError.response.data,
          )}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      } else if (error && typeof error === 'object' && 'request' in error) {
        // Axios error without response (network error)
        const axiosError = error as { message?: string };
        console.error('Telegram Network Error:', axiosError.message || 'Network error');
        throw new HttpException(
          `Telegram Network Error: ${axiosError.message || 'Network error'}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      } else {
        // Other error
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error('Telegram Error:', errorMessage);
        throw error instanceof HttpException
          ? error
          : new HttpException(`Telegram Error: ${errorMessage}`, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
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
      console.log('Form data:', JSON.stringify(form));

      // Log detailed error information
      if (error instanceof Error) {
        console.error('Error sending alerts:', {
          message: error.message,
          stack: error.stack,
          name: error.name,
        });
      } else if (error && typeof error === 'object' && 'response' in error) {
        // Axios error with response
        const axiosError = error as {
          response: { status: number; statusText: string; data: unknown };
        };
        console.error('Error sending alerts:', {
          status: axiosError.response.status,
          statusText: axiosError.response.statusText,
          data: axiosError.response.data,
        });
      } else {
        console.error('Error sending alerts:', error);
      }

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
