import { Get } from '@decorators/httpDecorators';
import { Controller, Param } from '@nestjs/common';
import { DROUGHT, DroughtDto, FLOOD, FloodDto, INCIDENT, IncidentDto } from '@wfp-dmp/interfaces';

import { KoboService } from './kobo.service';

@Controller('kobo')
export class KoboController {
  constructor(private readonly koboService: KoboService) {}

  @Get('last-forms/:numDays')
  async getLastForms(
    @Param('numDays') numDays: number,
  ): Promise<(FloodDto | DroughtDto | IncidentDto)[]> {
    const [floodResp, droughtResp, incidentResp] = await Promise.all([
      this.koboService.getLastForms(numDays, FLOOD),
      this.koboService.getLastForms(numDays, DROUGHT),
      this.koboService.getLastForms(numDays, INCIDENT),
    ]);

    return [...floodResp.results, ...droughtResp.results, ...incidentResp.results];
  }
}
