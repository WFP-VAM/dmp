import { UseProvince } from '@auth/user.decorator';
import { Get } from '@decorators/httpDecorators';
import { Controller, Param, Query } from '@nestjs/common';
import {
  DROUGHT,
  DroughtDto,
  FLOOD,
  FloodDto,
  GetFormsDto,
  INCIDENT,
  IncidentDto,
} from '@wfp-dmp/interfaces';

import { KoboService } from './kobo.service';

@Controller('kobo')
export class KoboController {
  constructor(private readonly koboService: KoboService) {}

  @Get('last-forms/:numDays')
  async getLastForms(
    @UseProvince() province: string | undefined,
    @Param('numDays') numDays: number,
  ): Promise<(FloodDto | DroughtDto | IncidentDto)[]> {
    const [floodResp, droughtResp, incidentResp] = await Promise.all([
      this.koboService.getLastForms(numDays, FLOOD, province),
      this.koboService.getLastForms(numDays, DROUGHT, province),
      this.koboService.getLastForms(numDays, INCIDENT, province),
    ]);

    return [...floodResp.results, ...droughtResp.results, ...incidentResp.results];
  }

  @Get('forms')
  async getForms(
    @UseProvince() province: string | undefined,
    @Query() filters: GetFormsDto,
  ): Promise<(FloodDto | DroughtDto | IncidentDto)[]> {
    const response = await this.koboService.getForms(province, filters.DisTyp);

    return response.results;
  }
}
