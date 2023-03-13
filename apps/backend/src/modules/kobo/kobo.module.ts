import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

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
    }),
  ],
  controllers: [KoboController],
  providers: [KoboService],
})
export class KoboModule {}
