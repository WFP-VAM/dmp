import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { formatDateToStringDate, substractDaysToDate } from '@utils/date';
import {
  computeDisasterTypeFromDistTyps,
  DisasterType,
  DROUGHT,
  DroughtDto,
  DroughtQueryResponseDto,
  FLOOD,
  FloodDto,
  FloodQueryResponseDto,
  INCIDENT,
  IncidentDto,
  IncidentQueryResponseDto,
  KOBO_WRITE_FORBIDDEN,
  koboKeys,
  PatchDroughtFormDto,
  PatchFloodFormDto,
  PatchIncidentFormDto,
  ValidationStatusDto,
  ValidationStatusValue,
} from '@wfp-dmp/interfaces';
import { isAxiosError } from 'axios';

import { AssetId } from './constants';
import { toKoboBulkData } from './koboBulkPayload';

type QueryResponse<T> = T extends typeof FLOOD
  ? FloodQueryResponseDto
  : T extends typeof DROUGHT
  ? DroughtQueryResponseDto
  : T extends typeof INCIDENT
  ? IncidentQueryResponseDto
  : never;

type GetFormResponse<T> = T extends typeof FLOOD
  ? FloodDto
  : T extends typeof DROUGHT
  ? DroughtDto
  : T extends typeof INCIDENT
  ? IncidentDto
  : never;

const KOBO_PAGE_LIMIT = 1000;
const KOBO_INSUFFICIENT_RIGHTS_MESSAGE =
  'The app does not have sufficient Kobo access to update this report.';

const nonEmptyString = (value: unknown): string | undefined => {
  if (typeof value !== 'string') {
    return undefined;
  }

  const trimmed = value.trim();
  if (trimmed === '' || trimmed.startsWith('<')) {
    return undefined;
  }

  return trimmed;
};

@Injectable()
export class KoboService {
  constructor(private readonly httpService: HttpService) {}

  private readKoboMessage(data: unknown): string | undefined {
    const asString = nonEmptyString(data);
    if (asString !== undefined) {
      return asString;
    }

    if (typeof data !== 'object' || data === null) {
      return undefined;
    }

    const body = data as { detail?: unknown; message?: unknown };

    return nonEmptyString(body.detail) ?? nonEmptyString(body.message);
  }

  private rethrowKoboWriteError(error: unknown): never {
    if (!isAxiosError(error) || error.response === undefined) {
      throw error;
    }

    const status = error.response.status;
    const koboMessage = this.readKoboMessage(error.response.data);
    const isForbidden = status === HttpStatus.FORBIDDEN;

    throw new HttpException(
      {
        statusCode: isForbidden ? HttpStatus.FORBIDDEN : status,
        ...(isForbidden ? { code: KOBO_WRITE_FORBIDDEN } : {}),
        message: isForbidden
          ? KOBO_INSUFFICIENT_RIGHTS_MESSAGE
          : koboMessage ?? 'Kobo request failed',
      },
      isForbidden ? HttpStatus.FORBIDDEN : status,
    );
  }

  private async getAllPages<T extends DisasterType>(
    path: string,
    params?: Record<string, unknown>,
  ): Promise<QueryResponse<T>> {
    const { data: firstPage } = await this.httpService.axiosRef.get<QueryResponse<T>>(path, {
      params: {
        ...params,
        limit: KOBO_PAGE_LIMIT,
      },
    });

    const results = [...firstPage.results];
    let nextUrl = firstPage.next;

    while (nextUrl !== null) {
      const { data: nextPage } = await this.httpService.axiosRef.get<QueryResponse<T>>(nextUrl);

      results.push(...nextPage.results);
      nextUrl = nextPage.next;
    }

    return {
      ...firstPage,
      next: null,
      results,
    };
  }

  async getLastForms<T extends DisasterType>(
    numDays: number,
    disasterType: T,
    province: string | undefined,
  ): Promise<QueryResponse<T>> {
    const startDate = substractDaysToDate(new Date(), numDays);

    return this.getAllPages<T>(`assets/${AssetId[disasterType]}/data.json`, {
      query: {
        [koboKeys[disasterType].disasterDate]: { $gte: formatDateToStringDate(startDate) },
        ...(province !== undefined && {
          [koboKeys[disasterType].province]: province,
        }),
      },
    });
  }

  async getForms<T extends DisasterType>({
    disTyps,
    province,
    district,
    commune,
    startDate,
    endDate,
  }: {
    disTyps: string[];
    province?: string | string[];
    district?: string | string[];
    commune?: string | string[];
    startDate?: string;
    endDate?: string;
  }): Promise<QueryResponse<T>> {
    const disasterType = computeDisasterTypeFromDistTyps(disTyps);

    return this.getAllPages<T>(`assets/${AssetId[disasterType]}/data.json`, {
      query: {
        ...(province !== undefined && {
          [koboKeys[disasterType].province]: Array.isArray(province) ? { $in: province } : province,
        }),
        ...(district !== undefined && {
          [koboKeys[disasterType].district]: Array.isArray(district) ? { $in: district } : district,
        }),
        ...(commune !== undefined && {
          [koboKeys[disasterType].commune]: Array.isArray(commune) ? { $in: commune } : commune,
        }),
        [koboKeys[disasterType].disasterDate]: { $gte: startDate, $lte: endDate },
        [koboKeys[disasterType].disTyp]: { $in: disTyps },
      },
    });
  }

  async getForm<T extends DisasterType>(
    province: string | undefined,
    disasterType: DisasterType,
    id: string,
  ): Promise<GetFormResponse<T>> {
    const { data } = await this.httpService.axiosRef.get<GetFormResponse<T>>(
      `assets/${AssetId[disasterType]}/data/${id}.json`,
      {
        params: {
          ...(province !== undefined && {
            query: {
              [koboKeys[disasterType].province]: province,
            },
          }),
        },
      },
    );

    return data;
  }

  async patchValidationStatus(
    disasterType: DisasterType,
    id: string,
    validationStatusValue: ValidationStatusValue,
  ): Promise<ValidationStatusDto> {
    try {
      const { data } = await this.httpService.axiosRef.patch<ValidationStatusDto>(
        `assets/${AssetId[disasterType]}/data/${id}/validation_status/`,
        {
          'validation_status.uid': validationStatusValue,
        },
      );

      return data;
    } catch (error: unknown) {
      this.rethrowKoboWriteError(error);
    }
  }

  async patchForm(
    disasterType: DisasterType,
    id: string,
    fieldsToUpdate: PatchFloodFormDto | PatchDroughtFormDto | PatchIncidentFormDto,
  ): Promise<number> {
    const submissionId = /^\d+$/.test(id) ? Number(id) : id;
    const data = toKoboBulkData(fieldsToUpdate as Record<string, unknown>);

    try {
      const { data: response } = await this.httpService.axiosRef.patch<{
        results: { status_code: number }[];
      }>(`assets/${AssetId[disasterType]}/data/bulk/`, {
        payload: {
          submission_ids: [submissionId],
          data,
        },
      });

      return response.results[0].status_code;
    } catch (error: unknown) {
      this.rethrowKoboWriteError(error);
    }
  }
}
