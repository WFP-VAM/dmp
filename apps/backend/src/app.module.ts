import { AdminModule } from '@adminjs/nestjs';
import { Database, Resource } from '@adminjs/typeorm';
import { AuthModule } from '@auth/auth.module';
import { MiddlewareConsumer, Module, RequestMethod, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import AdminJS from 'adminjs';
import { TypeormStore } from 'connect-typeorm';
import { Repository } from 'typeorm';

import { Session } from './adminjs/session.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dataSourceOptions } from './datasource.options';
import { validate } from './env.validation';
import { EntityNotFoundFilter } from './exception/entity-not-found.filter';
import { QueryFailedFilter } from './exception/query-failed.filter';
import { KoboModule } from './modules/kobo/kobo.module';
import { LoggerMiddleware } from './modules/logger/logger.middleware';
import { LoggerModule } from './modules/logger/logger.module';
import { UserModule } from './modules/user/user.module';
import { WebhookModule } from './modules/webhook/webhook.module';

AdminJS.registerAdapter({ Database, Resource });

if (process.env.SUPERADMIN_USERNAME === undefined) {
  throw new Error('SUPERADMIN_USERNAME is not defined');
}
if (process.env.SUPERADMIN_PASSWORD === undefined) {
  throw new Error('SUPERADMIN_PASSWORD is not defined');
}

const ADMINJS_ADMIN = {
  email: `${process.env.SUPERADMIN_USERNAME}@superadmin.com`,
  password: process.env.SUPERADMIN_PASSWORD,
};

const authenticate = async (email: string, password: string) => {
  if (email === ADMINJS_ADMIN.email && password === ADMINJS_ADMIN.password) {
    return Promise.resolve({ email: ADMINJS_ADMIN.email });
  }

  return null;
};

@Module({
  imports: [
    ConfigModule.forRoot({ validate, isGlobal: true, ignoreEnvFile: true }),
    TypeOrmModule.forRoot(dataSourceOptions),
    AdminModule.createAdminAsync({
      useFactory: (sessionRepository: Repository<Session>) => {
        if (process.env.ADMINJS_COOKIE_SECRET === undefined) {
          throw new Error('ADMINJS_COOKIE_SECRET is not defined');
        }

        if (process.env.ADMINJS_SESSION_SECRET === undefined) {
          throw new Error('ADMINJS_SESSION_SECRET is not defined');
        }

        return {
          adminJsOptions: {
            rootPath: '/admin',
            branding: {
              logo: false,
              companyName: 'Disaster Monitoring Platform',
              withMadeWithLove: false,
              favicon: 'https://dmp.ovio.org/favicon.ico',
              theme: {
                colors: {
                  primary100: '#63B2BD', // Example color for primary buttons
                  primary80: '#fff', // Example color for primary buttons on hover
                  primary60: '#fff', // Example color for primary buttons on active
                  primary40: '#fff', // Example color for primary buttons on focus
                  primary20: '#fff', // Example color for primary buttons on disabled
                },
              },
            },
            locale: {
              language: 'en',
              translations: {
                labels: {
                  loginWelcome: 'WFP DMP', // the big title
                },
                messages: {
                  loginWelcome: 'Administration Panel', // the smaller text
                },
              },
            },
          },
          auth: {
            authenticate,
            cookieName: 'adminjs',
            cookiePassword: process.env.ADMINJS_COOKIE_SECRET,
          },
          sessionOptions: {
            resave: false,
            saveUninitialized: false,
            secret: process.env.ADMINJS_SESSION_SECRET,
            store: new TypeormStore({
              cleanupLimit: 2,
              ttl: 86400,
            }).connect(sessionRepository),
          },
        };
      },
      imports: [TypeOrmModule.forFeature([Session])],
      inject: [getRepositoryToken(Session)],
    }),

    UserModule,
    AuthModule,
    LoggerModule,
    KoboModule,
    WebhookModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    },
    {
      provide: APP_FILTER,
      useClass: EntityNotFoundFilter,
    },
    {
      provide: APP_FILTER,
      useClass: QueryFailedFilter,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
