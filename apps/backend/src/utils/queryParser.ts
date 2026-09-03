import { INestApplication } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import qs from 'qs';

// qs defaults arrayLimit to 20; admin-area filters can exceed that.
const QUERY_ARRAY_LIMIT = 2000;

export const configureQueryParser = (app: INestApplication): void => {
  const expressApp = app as NestExpressApplication;

  expressApp.set('query parser', (queryString: string) =>
    qs.parse(queryString, { arrayLimit: QUERY_ARRAY_LIMIT }),
  );
};
