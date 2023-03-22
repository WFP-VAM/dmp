import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { formatDateToStringDate, substractDaysToDate } from '@utils/date';
import {
  computeDisasterTypeFromDistTyp,
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

type GetFormResponse<T> = T extends typeof FLOOD
  ? FloodDto
  : T extends typeof DROUGHT
  ? DroughtDto
  : T extends typeof INCIDENT
  ? IncidentDto
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

  async getForms<T extends DisasterType>(
    province: string | undefined,
    disTyp: string,
  ): Promise<QueryResponse<T>> {
    const disasterType = computeDisasterTypeFromDistTyp(disTyp);
    const { data } = await this.httpService.axiosRef.get<QueryResponse<T>>(
      `assets/${AssetId[disasterType]}/data.json`,
      {
        params: {
          query: {
            [koboKeys[disasterType].province]: province,
            [koboKeys[disasterType].disTyp]: disTyp,
          },
        },
      },
    );

    return data;
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
          query: {
            [koboKeys[disasterType].province]: province,
          },
        },
      },
    );

    return data;
  }
}
