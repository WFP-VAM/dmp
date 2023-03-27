import { UseProvince } from '@auth/user.decorator';
import { Get } from '@decorators/httpDecorators';
import { Controller, HttpException, HttpStatus, Param, Query } from '@nestjs/common';
import {
  DROUGHT,
  DroughtDto,
  FLOOD,
  FloodDto,
  GetFormDto,
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

  @Get('form/:disasterType/:id')
  async getForm(
    @UseProvince() province: string | undefined,
    @Param() params: GetFormDto,
  ): Promise<FloodDto | DroughtDto | IncidentDto> {
    try {
      const response = await this.koboService.getForm(province, params.disasterType, params.id);

      return response;
    } catch (error) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }
}
