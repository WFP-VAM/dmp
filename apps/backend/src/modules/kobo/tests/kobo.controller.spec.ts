import { AuthService } from '@auth/auth.service';
import { UserFactory } from '@modules/user/user.factory';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '@root/app.module';
import {
  DROUGHT,
  DroughtDto,
  DroughtQueryResponseDto,
  FLOOD,
  FloodDto,
  FloodQueryResponseDto,
  INCIDENT,
  IncidentDto,
  IncidentQueryResponseDto,
} from '@wfp-dmp/interfaces';
import request from 'supertest';

import { KoboService } from '../kobo.service';
import { droughtMock } from './__mocks__/drought';
import { floodMock } from './__mocks__/flood';
import { incidentMock } from './__mocks__/incident';

describe('KoboController', () => {
  let app: INestApplication;
  let authService: AuthService;
  let userFactory: UserFactory;
  let koboService: KoboService;

  beforeEach(async () => {
    const testingModule: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    userFactory = new UserFactory();
    authService = testingModule.get(AuthService);
    koboService = testingModule.get(KoboService);
    app = testingModule.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET - /kobo/n', () => {
    it('should return 200 with the kobo response', async () => {
      const numDays = '5';

      const getLastFormsSpy = jest
        .spyOn(koboService, 'getLastForms')
        .mockImplementation((_, disasterType) => {
          let response;

          switch (disasterType) {
            case FLOOD:
              response = {
                count: 1,
                next: null,
                previous: null,
                results: [floodMock],
              } as FloodQueryResponseDto;
              break;
            case DROUGHT:
              response = {
                count: 1,
                next: null,
                previous: null,
                results: [droughtMock],
              } as DroughtQueryResponseDto;
              break;
            case INCIDENT:
              response = {
                count: 1,
                next: null,
                previous: null,
                results: [incidentMock],
              } as IncidentQueryResponseDto;
              break;
          }

          return Promise.resolve(response);
        });

      const user = await userFactory.createOne({ roles: ['ncdm'] });
      const accessToken = authService.createAccessToken(user, 10000);
      await request(app.getHttpServer())
        .get(`/kobo/last-forms/${numDays}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
        .expect((response: { body: (FloodDto | DroughtDto | IncidentDto)[] }) => {
          expect(response.body).toEqual([floodMock, droughtMock, incidentMock]);
          expect(getLastFormsSpy).toHaveBeenCalledTimes(3);
          expect(getLastFormsSpy).toHaveBeenNthCalledWith(1, numDays, FLOOD);
          expect(getLastFormsSpy).toHaveBeenNthCalledWith(2, numDays, DROUGHT);
          expect(getLastFormsSpy).toHaveBeenNthCalledWith(3, numDays, INCIDENT);
        });
    });
  });
});
