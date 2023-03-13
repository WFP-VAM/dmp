import { AuthService } from '@auth/auth.service';
import { UserFactory } from '@modules/user/user.factory';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '@root/app.module';
import { DROUGHT, FLOOD, INCIDENT } from '@wfp-dmp/interfaces';
import request from 'supertest';

import { KoboService } from '../kobo.service';

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
      const koboResult = 'testKoboAnswer';
      jest.spyOn(koboService, 'getLastForms').mockImplementation(() => Promise.resolve(koboResult));

      const user = await userFactory.createOne({ roles: ['ncdm'] });
      const accessToken = authService.createAccessToken(user, 10000);
      await request(app.getHttpServer())
        .get('/kobo/5')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200)
        .expect(
          (response: { body: { [FLOOD]: string; [DROUGHT]: string; [INCIDENT]: string } }) => {
            expect(response.body).toEqual({
              [FLOOD]: koboResult,
              [DROUGHT]: koboResult,
              [INCIDENT]: koboResult,
            });
          },
        );
    });
  });
});
