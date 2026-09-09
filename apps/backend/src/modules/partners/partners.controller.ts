import { Get } from '@decorators/httpDecorators';
import { Controller, Logger, Query, Req, UseGuards } from '@nestjs/common';
import { FloodAffectedVillageDto, GetFloodAffectedVillagesDto } from '@wfp-dmp/interfaces';

import { PartnerApiKeyGuard, PartnerRequest } from './partnerApiKey.guard';
import { PartnersService } from './partners.service';

@Controller('partners')
export class PartnersController {
  private readonly logger = new Logger(PartnersController.name);

  constructor(private readonly partnersService: PartnersService) {}

  @Get('flood-affected-villages', { isPublic: true })
  @UseGuards(PartnerApiKeyGuard)
  async getFloodAffectedVillages(
    @Req() request: PartnerRequest,
    @Query() filters: GetFloodAffectedVillagesDto,
  ): Promise<FloodAffectedVillageDto[]> {
    // Minimal audit trail per docs/adr/003-partner-api-approach.md: who queried what, when.
    this.logger.log(
      `partner=${request.partnerName ?? 'unknown'} startDate=${filters.startDate} endDate=${
        filters.endDate
      }`,
    );

    return this.partnersService.getFloodAffectedVillages(filters.startDate, filters.endDate);
  }
}
