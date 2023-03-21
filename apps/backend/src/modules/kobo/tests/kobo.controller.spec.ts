import { AuthService } from '@auth/auth.service';
import { User } from '@modules/user/user.entity';
import { UserFactory } from '@modules/user/user.factory';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AppModule } from '@root/app.module';
import { DROUGHT, DroughtDto, FLOOD, FloodDto, INCIDENT, IncidentDto } from '@wfp-dmp/interfaces';
import request from 'supertest';
import { Repository } from 'typeorm';

import { KoboService } from '../kobo.service';
import { droughtMock } from './__mocks__/drought';
import { floodMock } from './__mocks__/flood';
import { getLastFormsMock } from './__mocks__/getLastForms';
import { incidentMock } from './__mocks__/incident';

describe('KoboController', () => {
  let app: INestApplication;
  let userRepository: Repository<User>;
  let authService: AuthService;
  let userFactory: UserFactory;
  let koboService: KoboService;

  beforeEach(async () => {
    const testingModule: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    userRepository = testingModule.get(getRepositoryToken(User));
    userFactory = new UserFactory(userRepository);
    authService = testingModule.get(AuthService);
    koboService = testingModule.get(KoboService);
    app = testingModule.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await userRepository.clear();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET lastforms', () => {
    it('should return 200 with the kobo response for ncdm', async () => {
      const numDays = '5';
      const role = 'ncdm';

      const getLastFormsSpy = jest
        .spyOn(koboService, 'getLastForms')
        .mockImplementation(getLastFormsMock);

      const user = await userFactory.createOne({ roles: [role] });
      const accessToken = authService.createAccessToken(user, 10000);
      await request(app.getHttpServer())
        .get(`/kobo/last-forms/${numDays}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
        .expect((response: { body: (FloodDto | DroughtDto | IncidentDto)[] }) => {
          expect(response.body).toEqual([floodMock, droughtMock, incidentMock]);
          expect(getLastFormsSpy).toHaveBeenCalledTimes(3);
          expect(getLastFormsSpy).toHaveBeenNthCalledWith(1, numDays, FLOOD, undefined);
          expect(getLastFormsSpy).toHaveBeenNthCalledWith(2, numDays, DROUGHT, undefined);
          expect(getLastFormsSpy).toHaveBeenNthCalledWith(3, numDays, INCIDENT, undefined);
        });
    });

    it('should return 200 and the service should receive as param the user province for pcdm', async () => {
      const numDays = '5';
      const role = 'pcdm';
      const province = '10';

      const getLastFormsSpy = jest
        .spyOn(koboService, 'getLastForms')
        .mockImplementation(getLastFormsMock);

      const user = await userFactory.createOne({ roles: [role], province });
      const accessToken = authService.createAccessToken(user, 10000);
      await request(app.getHttpServer())
        .get(`/kobo/last-forms/${numDays}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
        .expect((response: { body: (FloodDto | DroughtDto | IncidentDto)[] }) => {
          expect(response.body).toEqual([floodMock, droughtMock, incidentMock]);
          expect(getLastFormsSpy).toHaveBeenCalledTimes(3);
          expect(getLastFormsSpy).toHaveBeenNthCalledWith(1, numDays, FLOOD, province);
          expect(getLastFormsSpy).toHaveBeenNthCalledWith(2, numDays, DROUGHT, province);
          expect(getLastFormsSpy).toHaveBeenNthCalledWith(3, numDays, INCIDENT, province);
        });
    });

    it('should return a 500 if the pcdm does not have a province', async () => {
      const numDays = '5';
      const role = 'pcdm';

      jest.spyOn(koboService, 'getLastForms').mockImplementation(getLastFormsMock);
      const user = await userFactory.createOne({ roles: [role] });
      const accessToken = authService.createAccessToken(user, 10000);
      await request(app.getHttpServer())
        .get(`/kobo/last-forms/${numDays}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(500);
    });
  });
});
