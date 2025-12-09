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
      paramsSerializer: (params) => {
        // Kobo API expects the 'query' parameter as a JSON-encoded string
        // Handle 'query' specially: if it's an object, JSON stringify it; if it's already a string, use it as-is
        const { query, ...otherParams } = params as { query?: string | Record<string, unknown>; [key: string]: unknown };
        
        let queryString = '';
        if (query !== undefined) {
          // If query is an object, JSON stringify it; if it's already a string, use it directly
          const queryValue = typeof query === 'string' ? query : JSON.stringify(query);
          queryString = `query=${encodeURIComponent(queryValue)}`;
        }
        
        // Serialize other params normally
        const otherParamsString = qs.stringify(otherParams, { arrayFormat: 'brackets' });
        
        // Combine both parts
        if (queryString && otherParamsString) {
          return `${queryString}&${otherParamsString}`;
        }
        return queryString || otherParamsString;
      },
    }),
  ],
  controllers: [KoboController],
  providers: [KoboService],
})
export class KoboModule {}
