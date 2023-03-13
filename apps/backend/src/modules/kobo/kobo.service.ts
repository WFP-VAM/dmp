import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { formatDateToStringDate, substractDaysToDate } from '@utils/date';
import { DisasterType } from '@wfp-dmp/interfaces';

import { AssetId } from './constants';

@Injectable()
export class KoboService {
  constructor(private readonly httpService: HttpService) {}
  async getLastForms(numDays: number, disasterType: DisasterType): Promise<string> {
    const startDate = substractDaysToDate(new Date(), numDays);
    // TODO: update once the form answers are typed
    const { data } = await this.httpService.axiosRef.get<undefined>(
      `assets/${AssetId[disasterType]}/data.json`,
      {
        params: { query: { _submission_time: { $gt: formatDateToStringDate(startDate) } } },
      },
    );

    return JSON.stringify(data);
  }
}
