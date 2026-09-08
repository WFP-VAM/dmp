import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { koboParamsSerializer } from '../kobo/koboParamsSerializer';
import { PartnersController } from './partners.controller';
import { PartnersService } from './partners.service';

// Uses its own Kobo credential (KOBO_PUBLIC_API_TOKEN), deliberately separate from the
// validation-workflow token used by KoboModule (KOBO_TOKEN) — see
// docs/adr/003-partner-api-approach.md. Revoking/rotating this token must never touch the
// validation write path.
//
// Left optional (unlike KOBO_TOKEN) so environments that haven't provisioned the partners
// feature yet don't fail to boot; calls simply fail against Kobo (401) until it's set.
const koboPublicApiToken = process.env.KOBO_PUBLIC_API_TOKEN;

@Module({
  imports: [
    HttpModule.register({
      headers: { authorization: `Token ${koboPublicApiToken ?? ''}` },
      baseURL: 'https://eu.kobotoolbox.org/api/v2/',
      proxy: false,
      paramsSerializer: koboParamsSerializer,
    }),
  ],
  controllers: [PartnersController],
  providers: [PartnersService],
})
export class PartnersModule {}
