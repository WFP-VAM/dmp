import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import {
  FLOOD,
  FloodAffectedVillageDto,
  FloodQueryResponseDto,
  koboKeys,
  parseAffectedVillageCodes,
  villageToCommune,
} from '@wfp-dmp/interfaces';

import { AssetId } from '../kobo/constants';

const KOBO_PAGE_LIMIT = 1000;

@Injectable()
export class PartnersService {
  constructor(private readonly httpService: HttpService) {}

  private async getAllApprovedFloodPages(
    startDate: string,
    endDate: string,
  ): Promise<FloodQueryResponseDto> {
    // Approved-only filter is enforced here, not by Kobo permissions — see
    // docs/adr/003-partner-api-approach.md. The service account behind this HttpService
    // (KOBO_PUBLIC_API_TOKEN) can technically see all submissions; every call from this
    // service must include this filter.
    //
    // PARTNER_SKIP_APPROVAL_FILTER is a local-dev-only escape hatch (e.g. to test against
    // Kobo data before anything has been approved yet). It must never be set outside local
    // development — there is no guard here against enabling it in a deployed environment,
    // so treat it as manual/trusted, not something to wire into any config UI.
    const skipApprovalFilter = process.env.PARTNER_SKIP_APPROVAL_FILTER === 'true';

    const query = {
      ...(skipApprovalFilter ? {} : { '_validation_status.uid': 'validation_status_approved' }),
      [koboKeys[FLOOD].disasterDate]: { $gte: startDate, $lte: endDate },
    };

    const { data: firstPage } = await this.httpService.axiosRef.get<FloodQueryResponseDto>(
      `assets/${AssetId[FLOOD]}/data.json`,
      { params: { query, limit: KOBO_PAGE_LIMIT } },
    );

    const results = [...firstPage.results];
    let nextUrl = firstPage.next;

    while (nextUrl !== null) {
      const { data: nextPage } = await this.httpService.axiosRef.get<FloodQueryResponseDto>(
        nextUrl,
      );

      results.push(...nextPage.results);
      nextUrl = nextPage.next;
    }

    return { ...firstPage, next: null, results };
  }

  async getFloodAffectedVillages(
    startDate: string,
    endDate: string,
  ): Promise<FloodAffectedVillageDto[]> {
    const { results } = await this.getAllApprovedFloodPages(startDate, endDate);

    return results.flatMap((submission) => {
      const villageCodes = parseAffectedVillageCodes(submission['g2/village']);

      return villageCodes.map(
        (villageCode): FloodAffectedVillageDto => ({
          gazetteerCode: villageCode,
          gazetteerLevel: 'village',
          communeCode: villageToCommune[villageCode],
          floodAffected: true,
          disasterDate: submission['g2/Date_Dis'],
          submissionId: submission._id,
        }),
      );
    });
  }
}
