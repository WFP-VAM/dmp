import { UseProvince } from '@auth/user.decorator';
import { Get } from '@decorators/httpDecorators';
import { Body, Controller, HttpException, HttpStatus, Param, Patch, Query } from '@nestjs/common';
import { OriginGuard } from '@utils/originGuard';
import {
  DisasterDtoType,
  DROUGHT,
  FLOOD,
  GetFormDto,
  GetFormsDto,
  INCIDENT,
  PatchDroughtFormDto,
  PatchFloodFormDto,
  PatchIncidentFormDto,
  PatchValidationStatusDto,
  ValidationStatusDto,
} from '@wfp-dmp/interfaces';

import { KoboService } from './kobo.service';

const AuthorizedPatchOrigin = /^https:\/\/dmp\.ovio\.org(\/.*)?$/;

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

    // axios set an empty list as no query params
    if (filters.disTyps === undefined) return [];

    const response = await this.koboService.getForms({
      disTyps: filters.disTyps,
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

  @Patch('form/validationStatus')
  @OriginGuard(AuthorizedPatchOrigin)
  async patchValidationStatus(
    @Body() body: PatchValidationStatusDto,
  ): Promise<ValidationStatusDto> {
    // TODO add province guard for PCDM
    const response = await this.koboService.patchValidationStatus(
      body.disasterType,
      body.id,
      body.validationStatusValue,
    );

    return response;
  }

  @Patch(`form/${FLOOD}/:id`)
  @OriginGuard(AuthorizedPatchOrigin)
  async patchFloodForm(
    @Param('id') id: string,
    @Body() body: PatchFloodFormDto,
  ): Promise<{ status: number }> {
    const status = await this.koboService.patchForm(FLOOD, id, body);

    return { status };
  }

  @Patch(`form/${DROUGHT}/:id`)
  @OriginGuard(AuthorizedPatchOrigin)
  async patchDroughtForm(
    @Param('id') id: string,
    @Body() body: PatchDroughtFormDto,
  ): Promise<{ status: number }> {
    const status = await this.koboService.patchForm(DROUGHT, id, body);

    return { status };
  }

  @Patch(`form/${INCIDENT}/:id`)
  @OriginGuard(AuthorizedPatchOrigin)
  async patchIncidentForm(
    @Param('id') id: string,
    @Body() body: PatchIncidentFormDto,
  ): Promise<{ status: number }> {
    const status = await this.koboService.patchForm(INCIDENT, id, body);

    return { status };
  }
}
