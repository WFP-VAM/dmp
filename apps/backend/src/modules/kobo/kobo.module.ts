import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { KoboController } from './kobo.controller';
import { KoboService } from './kobo.service';
import { koboParamsSerializer } from './koboParamsSerializer';

const koboToken = process.env.KOBO_TOKEN;
if (koboToken === undefined) {
  throw new Error('koboToken is not defined');
}
@Module({
  imports: [
    HttpModule.register({
      headers: { authorization: `Token ${koboToken}` },
      baseURL: 'https://eu.kobotoolbox.org/api/v2/',
      // Avoid HTTP(S)_PROXY (e.g. 127.0.0.1:7890) when proxy app is off — common local dev failure
      proxy: false,
      paramsSerializer: koboParamsSerializer,
    }),
  ],
  controllers: [KoboController],
  providers: [KoboService],
})
export class KoboModule {}
