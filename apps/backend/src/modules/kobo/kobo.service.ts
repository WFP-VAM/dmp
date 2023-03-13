import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { substractDaysToDate } from '@utils/date';

import { AssetId, DisasterType } from './constants';

@Injectable()
export class KoboService {
  constructor(private readonly httpService: HttpService) {}
  async getLastForms(nbDays: number, disasterType: DisasterType): Promise<string> {
    const startDate = substractDaysToDate(new Date(), nbDays);
    // TODO: update once the form answers are typed
    const { data } = await this.httpService.axiosRef.get<undefined>(
      `assets/${AssetId[disasterType]}/data.json`,
      {
        params: { query: { _submission_time: { $gt: startDate.toISOString().split('T')[0] } } },
      },
    );

    return JSON.stringify(data);
  }
}
