import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { formatDateToStringDate, substractDaysToDate } from '@utils/date';
import {
  DisasterType,
  DROUGHT,
  DroughtQueryResponseDto,
  FLOOD,
  FloodQueryResponseDto,
  INCIDENT,
  IncidentQueryResponseDto,
  koboKeys,
} from '@wfp-dmp/interfaces';

import { AssetId } from './constants';

type QueryResponse<T> = T extends typeof FLOOD
  ? FloodQueryResponseDto
  : T extends typeof DROUGHT
  ? DroughtQueryResponseDto
  : T extends typeof INCIDENT
  ? IncidentQueryResponseDto
  : never;

@Injectable()
export class KoboService {
  constructor(private readonly httpService: HttpService) {}
  async getLastForms<T extends DisasterType>(
    numDays: number,
    disasterType: T,
    province: string | undefined,
  ): Promise<QueryResponse<T>> {
    const startDate = substractDaysToDate(new Date(), numDays);
    const { data } = await this.httpService.axiosRef.get<QueryResponse<T>>(
      `assets/${AssetId[disasterType]}/data.json`,
      {
        params: {
          query: {
            _submission_time: { $gt: formatDateToStringDate(startDate) },
            [koboKeys[disasterType].province]: province,
          },
        },
      },
    );

    return data;
  }
}
