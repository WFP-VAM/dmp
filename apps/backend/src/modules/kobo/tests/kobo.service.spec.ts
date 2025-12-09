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
        get: jest.fn().mockResolvedValue({ data: {} }),
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
});
