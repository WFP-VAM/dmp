import { Get } from '@decorators/httpDecorators';
import { Controller, Param } from '@nestjs/common';
import { DROUGHT, FLOOD, GetLastFormsDto, INCIDENT } from '@wfp-dmp/interfaces';

import { KoboService } from './kobo.service';

@Controller('kobo')
export class KoboController {
  constructor(private readonly koboService: KoboService) {}

  @Get('/:nbDays')
  async getLastForms(@Param('nbDays') nbDays: number): Promise<GetLastFormsDto> {
    const [floodResp, droughtResp, incidentResp] = await Promise.all([
      this.koboService.getLastForms(nbDays, FLOOD),
      this.koboService.getLastForms(nbDays, DROUGHT),
      this.koboService.getLastForms(nbDays, INCIDENT),
    ]);

    return { [FLOOD]: floodResp, [DROUGHT]: droughtResp, [INCIDENT]: incidentResp };
  }
}
