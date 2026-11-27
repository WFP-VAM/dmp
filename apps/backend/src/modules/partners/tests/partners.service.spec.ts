import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { FLOOD, koboKeys } from '@wfp-dmp/interfaces';

import { AssetId } from '../../kobo/constants';
import { PartnersService } from '../partners.service';

describe('PartnersService', () => {
  let partnersService: PartnersService;
  let httpService: HttpService;

  const buildFloodSubmission = (overrides: Record<string, unknown> = {}) => ({
    _id: 1,
    'g2/Date_Dis': '2026-08-05',
    'g2/village': '1020101 1020104',
    ...overrides,
  });

  beforeEach(async () => {
    const httpServiceMock = {
      axiosRef: {
        get: jest.fn().mockResolvedValue({
          data: {
            count: 1,
            next: null,
            previous: null,
            results: [buildFloodSubmission()],
          },
        }),
      },
    } as unknown as HttpService;

    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        PartnersService,
        {
          provide: HttpService,
          useValue: httpServiceMock,
        },
      ],
    }).compile();

    partnersService = moduleRef.get(PartnersService);
    httpService = moduleRef.get(HttpService);
  });

  it('always filters on approved validation status and the disaster date range', async () => {
    await partnersService.getFloodAffectedVillages('2026-08-01', '2026-08-07');

    const firstCall = (httpService.axiosRef.get as jest.Mock).mock.calls[0] as [unknown, unknown];
    const url = firstCall[0];
    const config = firstCall[1];

    expect(url).toBe(`assets/${AssetId[FLOOD]}/data.json`);
    expect(config).toMatchObject({
      params: {
        query: {
          '_validation_status.uid': 'validation_status_approved',
          [koboKeys[FLOOD].disasterDate]: { $gte: '2026-08-01', $lte: '2026-08-07' },
        },
      },
    });
  });

  it('expands one submission into one row per affected village, with the correct commune code', async () => {
    const result = await partnersService.getFloodAffectedVillages('2026-08-01', '2026-08-07');

    expect(result).toEqual([
      {
        gazetteerCode: '1020101',
        gazetteerLevel: 'village',
        communeCode: '010201',
        floodAffected: true,
        disasterDate: '2026-08-05',
        submissionId: 1,
      },
      {
        gazetteerCode: '1020104',
        gazetteerLevel: 'village',
        communeCode: '010201',
        floodAffected: true,
        disasterDate: '2026-08-05',
        submissionId: 1,
      },
    ]);
  });

  it('drops unknown village codes and submissions with no village list', async () => {
    (httpService.axiosRef.get as jest.Mock).mockResolvedValueOnce({
      data: {
        count: 2,
        next: null,
        previous: null,
        results: [
          buildFloodSubmission({ _id: 2, 'g2/village': '1020101 9999999' }),
          buildFloodSubmission({ _id: 3, 'g2/village': undefined }),
        ],
      },
    });

    const result = await partnersService.getFloodAffectedVillages('2026-08-01', '2026-08-07');

    expect(result).toEqual([
      expect.objectContaining({ gazetteerCode: '1020101', submissionId: 2 }),
    ]);
  });

  it('follows pagination to collect every approved submission', async () => {
    (httpService.axiosRef.get as jest.Mock)
      .mockResolvedValueOnce({
        data: {
          count: 2,
          next: 'https://eu.kobotoolbox.org/api/v2/assets/x/data.json?cursor=abc',
          previous: null,
          results: [buildFloodSubmission({ _id: 10 })],
        },
      })
      .mockResolvedValueOnce({
        data: {
          count: 2,
          next: null,
          previous: null,
          results: [buildFloodSubmission({ _id: 11, 'g2/village': '1020104' })],
        },
      });

    const result = await partnersService.getFloodAffectedVillages('2026-08-01', '2026-08-07');

    expect(httpService.axiosRef.get).toHaveBeenCalledTimes(2);
    expect(result.map((row) => row.submissionId)).toEqual([10, 10, 11]);
  });
});
