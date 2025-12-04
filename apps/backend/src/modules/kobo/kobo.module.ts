import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import * as qs from 'qs';

import { KoboController } from './kobo.controller';
import { KoboService } from './kobo.service';

const koboToken = process.env.KOBO_TOKEN;
if (koboToken === undefined) {
  throw new Error('koboToken is not defined');
}
@Module({
  imports: [
    HttpModule.register({
      headers: { authorization: `Token ${koboToken}` },
      baseURL: 'https://kobo.humanitarianresponse.info/api/v2/',
      paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'brackets' }),
    }),
  ],
  controllers: [KoboController],
  providers: [KoboService],
})
export class KoboModule {}
