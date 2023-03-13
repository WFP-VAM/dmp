import { Get } from '@decorators/httpDecorators';
import { Controller, Param } from '@nestjs/common';
import { DROUGHT, FLOOD, GetLastFormsDto, INCIDENT } from '@wfp-dmp/interfaces';

import { KoboService } from './kobo.service';

@Controller('kobo')
export class KoboController {
  constructor(private readonly koboService: KoboService) {}

  @Get('/:numDays')
  async getLastForms(@Param('numDays') numDays: number): Promise<GetLastFormsDto> {
    const [floodResp, droughtResp, incidentResp] = await Promise.all([
      this.koboService.getLastForms(numDays, FLOOD),
      this.koboService.getLastForms(numDays, DROUGHT),
      this.koboService.getLastForms(numDays, INCIDENT),
    ]);

    return { [FLOOD]: floodResp, [DROUGHT]: droughtResp, [INCIDENT]: incidentResp };
  }
}
