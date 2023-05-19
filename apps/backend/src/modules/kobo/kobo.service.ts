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
  PatchDroughtFormDto,
  PatchFloodFormDto,
  PatchIncidentFormDto,
  ValidationStatusDto,
  ValidationStatusValue,
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
            [koboKeys[disasterType].entryDate]: { $gte: formatDateToStringDate(startDate) },
            [koboKeys[disasterType].province]: province,
          },
        },
      },
    );

    return data;
  }

  async getForms<T extends DisasterType>({
    disTyp,
    province,
    district,
    commune,
    startDate,
    endDate,
  }: {
    disTyp: string;
    province: string | undefined;
    district?: string;
    commune?: string;
    startDate?: string;
    endDate?: string;
  }): Promise<QueryResponse<T>> {
    const disasterType = computeDisasterTypeFromDistTyp(disTyp);
    // 100 is a special incident number meant to get "all incidents".
    const getAllIncidents = disTyp === '100';
    const { data } = await this.httpService.axiosRef.get<QueryResponse<T>>(
      `assets/${AssetId[disasterType]}/data.json`,
      {
        params: {
          query: {
            [koboKeys[disasterType].province]: province,
            [koboKeys[disasterType].district]: district,
            [koboKeys[disasterType].commune]: commune,
            [koboKeys[disasterType].entryDate]: { $gte: startDate, $lte: endDate },
            ...(!getAllIncidents && { [koboKeys[disasterType].disTyp]: disTyp }),
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

  async patchValidationStatus(
    disasterType: DisasterType,
    id: string,
    validationStatusValue: ValidationStatusValue,
  ): Promise<ValidationStatusDto> {
    const { data } = await this.httpService.axiosRef.patch<ValidationStatusDto>(
      `assets/${AssetId[disasterType]}/data/${id}/validation_status`,
      {
        'validation_status.uid': validationStatusValue,
      },
    );

    return data;
  }

  async patchForm(
    disasterType: DisasterType,
    id: string,
    fieldsToUpdate: PatchFloodFormDto | PatchDroughtFormDto | PatchIncidentFormDto,
  ): Promise<number> {
    const { data } = await this.httpService.axiosRef.patch<{ results: { status_code: number }[] }>(
      `assets/${AssetId[disasterType]}/data/bulk`,
      {
        payload: {
          submission_ids: [id],
          data: fieldsToUpdate,
        },
      },
    );

    return data.results[0].status_code;
  }
}
