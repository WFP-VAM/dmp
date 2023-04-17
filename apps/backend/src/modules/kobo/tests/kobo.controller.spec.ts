/* eslint-disable max-lines */
import { AuthService } from '@auth/auth.service';
import { User } from '@modules/user/user.entity';
import { UserFactory } from '@modules/user/user.factory';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AppModule } from '@root/app.module';
import {
  DisasterDtoType,
  DROUGHT,
  FLOOD,
  FloodDto,
  INCIDENT,
  ValidationStatusDto,
  ValidationStatusValue,
} from '@wfp-dmp/interfaces';
import request from 'supertest';
import { Repository } from 'typeorm';

import { KoboService } from '../kobo.service';
import { droughtMock } from './__mocks__/drought';
import { floodMock } from './__mocks__/flood';
import { getFormMock } from './__mocks__/getForm';
import { getFormsMock } from './__mocks__/getForms';
import { getLastFormsMock } from './__mocks__/getLastForms';
import { incidentMock } from './__mocks__/incident';
import { patchValidationStatusMock } from './__mocks__/patchValidationStatus';
import { validationStatusFactory } from './__mocks__/validationStatusFactory';

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
    jest.resetAllMocks();
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
        .expect((response: { body: DisasterDtoType[] }) => {
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
        .expect((response: { body: DisasterDtoType[] }) => {
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

  describe('GET forms', () => {
    it('should return 200 and the service should receive the filter params and use the PCDM province', async () => {
      const role = 'pcdm';
      const profileProvince = '20';
      const disTyp = '1';
      const startDate = '2023-02-02';
      const endDate = '2023-02-03';
      const province = '10';
      const district = '1010';
      const commune = '10101010';

      const getFormsSpy = jest.spyOn(koboService, 'getForms').mockImplementation(getFormsMock);

      const user = await userFactory.createOne({ roles: [role], province: profileProvince });
      const accessToken = authService.createAccessToken(user, 10000);
      await request(app.getHttpServer())
        .get('/kobo/forms')
        .query({ disTyp, startDate, endDate, province, district, commune })
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
        .expect((response: { body: FloodDto[] }) => {
          expect(response.body).toEqual([floodMock]);
          expect(getFormsSpy).toHaveBeenNthCalledWith(1, {
            disTyp,
            startDate,
            endDate,
            province: profileProvince,
            district,
            commune,
          });
        });
    });

    it('should return 200 and the service should receive the filter params for an NCDM', async () => {
      const role = 'ncdm';
      const disTyp = '1';
      const startDate = '2023-02-02';
      const endDate = '2023-02-03';
      const province = '10';
      const district = '1010';
      const commune = '10101010';

      const getFormsSpy = jest.spyOn(koboService, 'getForms').mockImplementation(getFormsMock);

      const user = await userFactory.createOne({ roles: [role] });
      const accessToken = authService.createAccessToken(user, 10000);
      await request(app.getHttpServer())
        .get('/kobo/forms')
        .query({ disTyp, startDate, endDate, province, district, commune })
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
        .expect((response: { body: FloodDto[] }) => {
          expect(response.body).toEqual([floodMock]);
          expect(getFormsSpy).toHaveBeenNthCalledWith(1, {
            disTyp,
            startDate,
            endDate,
            province,
            district,
            commune,
          });
        });
    });
  });

  describe('GET form', () => {
    it('should return 200 and the service should receive province, disaster type and form id', async () => {
      const role = 'pcdm';
      const province = '10';
      const disasterType = FLOOD;
      const id = 'test';

      const getFormsSpy = jest.spyOn(koboService, 'getForm').mockImplementation(getFormMock);

      const user = await userFactory.createOne({ roles: [role], province });
      const accessToken = authService.createAccessToken(user, 10000);
      await request(app.getHttpServer())
        .get(`/kobo/form/${disasterType}/${id}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
        .expect((response: { body: FloodDto }) => {
          expect(response.body).toEqual(floodMock);
          expect(getFormsSpy).toHaveBeenNthCalledWith(1, province, disasterType, id);
        });
    });
  });
  describe('PATCH form validation status', () => {
    it('should return 200 and the service should use the right params', async () => {
      const role = 'ncdm';
      const disasterType = FLOOD;
      const id = 'formTest';
      const validationStatusValue = ValidationStatusValue.approved;

      const getFormsSpy = jest
        .spyOn(koboService, 'patchValidationStatus')
        .mockImplementation(patchValidationStatusMock);

      const user = await userFactory.createOne({ roles: [role] });
      const accessToken = authService.createAccessToken(user, 10000);
      await request(app.getHttpServer())
        .patch('/kobo/form/validationStatus')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ id, disasterType, validationStatusValue })
        .expect(200)
        .expect((response: { body: ValidationStatusDto }) => {
          expect(response.body).toEqual(validationStatusFactory(validationStatusValue));
          expect(getFormsSpy).toHaveBeenNthCalledWith(1, disasterType, id, validationStatusValue);
        });
    });
  });
  describe('PATCH form flood', () => {
    it('should return 200 and the service should use the right params', async () => {
      const role = 'ncdm';
      const disasterType = FLOOD;
      const id = 'formTest';
      const data = { 'g3/g3_1/g3_2/NumFamAff': '10', 'g1/q_Phone': null };

      const patchFormSpy = jest.spyOn(koboService, 'patchForm').mockImplementation();

      const user = await userFactory.createOne({ roles: [role] });
      const accessToken = authService.createAccessToken(user, 10000);
      await request(app.getHttpServer())
        .patch(`/kobo/form/FLOOD/${id}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send(data)
        .expect(200)
        .expect(() => {
          expect(patchFormSpy).toHaveBeenNthCalledWith(1, disasterType, id, data);
        });
    });
  });
});
