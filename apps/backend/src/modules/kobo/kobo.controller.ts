import { UseProvince } from '@auth/user.decorator';
import { Get } from '@decorators/httpDecorators';
import { Controller, HttpException, HttpStatus, Param, Query } from '@nestjs/common';
import {
  DisasterDtoType,
  DROUGHT,
  FLOOD,
  GetFormDto,
  GetFormsDto,
  INCIDENT,
} from '@wfp-dmp/interfaces';

import { KoboService } from './kobo.service';

@Controller('kobo')
export class KoboController {
  constructor(private readonly koboService: KoboService) {}

  @Get('last-forms/:numDays')
  async getLastForms(
    @UseProvince() province: string | undefined,
    @Param('numDays') numDays: number,
  ): Promise<DisasterDtoType[]> {
    const [floodResp, droughtResp, incidentResp] = await Promise.all([
      this.koboService.getLastForms(numDays, FLOOD, province),
      this.koboService.getLastForms(numDays, DROUGHT, province),
      this.koboService.getLastForms(numDays, INCIDENT, province),
    ]);

    return [...floodResp.results, ...droughtResp.results, ...incidentResp.results];
  }

  @Get('forms')
  async getForms(
    @UseProvince() provinceToEnforce: string | undefined,
    @Query() filters: GetFormsDto,
  ): Promise<DisasterDtoType[]> {
    const province = provinceToEnforce === undefined ? filters.province : provinceToEnforce;

    const response = await this.koboService.getForms({
      disTyp: filters.disTyp,
      province,
      district: filters.district,
      commune: filters.commune,
      startDate: filters.startDate,
      endDate: filters.endDate,
    });

    return response.results;
  }

  @Get('form/:disasterType/:id')
  async getForm(
    @UseProvince() province: string | undefined,
    @Param() params: GetFormDto,
  ): Promise<DisasterDtoType> {
    try {
      const response = await this.koboService.getForm(province, params.disasterType, params.id);

      return response;
    } catch (error) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }
}
