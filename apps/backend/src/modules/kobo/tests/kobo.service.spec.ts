import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { FLOOD, koboKeys } from '@wfp-dmp/interfaces';

import { AssetId } from '../constants';
import { KoboService } from '../kobo.service';

describe('KoboService - nested params', () => {
  let koboService: KoboService;
  let httpService: HttpService;

  beforeEach(async () => {
    const httpServiceMock = {
      axiosRef: {
        get: jest.fn().mockResolvedValue({
          data: {
            count: 0,
            next: null,
            previous: null,
            results: [],
          },
        }),
        patch: jest.fn().mockResolvedValue({ data: {} }),
      },
    } as unknown as HttpService;

    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        KoboService,
        {
          provide: HttpService,
          useValue: httpServiceMock,
        },
      ],
    }).compile();

    koboService = moduleRef.get(KoboService);
    httpService = moduleRef.get(HttpService);
  });

  it('should build nested query params with $in arrays for province, district, commune and disTyps', async () => {
    const disTyps = ['1']; // maps to FLOOD
    const province = ['10', '20'];
    const district = ['1010'];
    const commune = ['10101010', '20202020'];
    const startDate = '2023-02-02';
    const endDate = '2023-02-03';

    await koboService.getForms({
      disTyps,
      province,
      district,
      commune,
      startDate,
      endDate,
    });

    expect(httpService.axiosRef.get).toHaveBeenCalledTimes(1);

    const firstCall = (httpService.axiosRef.get as jest.Mock).mock.calls[0] as [unknown, unknown];
    const url = firstCall[0];
    const config = firstCall[1];

    expect(url).toBe(`assets/${AssetId[FLOOD]}/data.json`);

    // paramsSerializer will automatically JSON stringify the query object
    const expectedQueryObj = {
      [koboKeys[FLOOD].province]: { $in: province },
      [koboKeys[FLOOD].district]: { $in: district },
      [koboKeys[FLOOD].commune]: { $in: commune },
      [koboKeys[FLOOD].entryDate]: { $gte: startDate, $lte: endDate },
      [koboKeys[FLOOD].disTyp]: { $in: disTyps },
    };

    expect(config).toMatchObject({
      params: {
        query: expectedQueryObj,
      },
    });
  });

  it('should fetch every page for getForms and merge the results', async () => {
    const disTyps = ['1']; // maps to FLOOD
    const province = ['10', '20'];
    const district = ['1010'];
    const commune = ['10101010', '20202020'];
    const startDate = '2023-02-02';
    const endDate = '2023-02-03';
    const nextUrl =
      'https://kobo.humanitarianresponse.info/api/v2/assets/test-asset/data.json?limit=1000&start=1000';

    (httpService.axiosRef.get as jest.Mock)
      .mockResolvedValueOnce({
        data: {
          count: 2,
          next: nextUrl,
          previous: null,
          results: [{ _id: 'first-page' }],
        },
      })
      .mockResolvedValueOnce({
        data: {
          count: 2,
          next: null,
          previous: nextUrl,
          results: [{ _id: 'second-page' }],
        },
      });

    const response = await koboService.getForms({
      disTyps,
      province,
      district,
      commune,
      startDate,
      endDate,
    });

    const expectedQueryObj = {
      [koboKeys[FLOOD].province]: { $in: province },
      [koboKeys[FLOOD].district]: { $in: district },
      [koboKeys[FLOOD].commune]: { $in: commune },
      [koboKeys[FLOOD].entryDate]: { $gte: startDate, $lte: endDate },
      [koboKeys[FLOOD].disTyp]: { $in: disTyps },
    };

    expect(httpService.axiosRef.get).toHaveBeenNthCalledWith(
      1,
      `assets/${AssetId[FLOOD]}/data.json`,
      expect.objectContaining({
        params: {
          limit: 1000,
          query: expectedQueryObj,
        },
      }),
    );
    expect(httpService.axiosRef.get).toHaveBeenNthCalledWith(2, nextUrl);
    expect(response.results).toEqual([{ _id: 'first-page' }, { _id: 'second-page' }]);
  });

  it('should fetch every page for getLastForms and merge the results', async () => {
    const nextUrl =
      'https://kobo.humanitarianresponse.info/api/v2/assets/test-asset/data.json?limit=1000&start=1000';

    (httpService.axiosRef.get as jest.Mock)
      .mockResolvedValueOnce({
        data: {
          count: 2,
          next: nextUrl,
          previous: null,
          results: [{ _id: 'first-page' }],
        },
      })
      .mockResolvedValueOnce({
        data: {
          count: 2,
          next: null,
          previous: nextUrl,
          results: [{ _id: 'second-page' }],
        },
      });

    const response = await koboService.getLastForms(7, FLOOD, '10');
    const firstCall = (httpService.axiosRef.get as jest.Mock).mock.calls[0] as [
      unknown,
      { params: { limit: number; query: Record<string, unknown> } },
    ];
    const url = firstCall[0];
    const config = firstCall[1];

    expect(url).toBe(`assets/${AssetId[FLOOD]}/data.json`);
    expect(config).toMatchObject({
      params: {
        limit: 1000,
        query: {
          [koboKeys[FLOOD].province]: '10',
        },
      },
    });
    expect(config.params.query[koboKeys[FLOOD].entryDate]).toEqual(expect.any(Object));
    expect(httpService.axiosRef.get).toHaveBeenNthCalledWith(2, nextUrl);
    expect(response.results).toEqual([{ _id: 'first-page' }, { _id: 'second-page' }]);
  });
});
