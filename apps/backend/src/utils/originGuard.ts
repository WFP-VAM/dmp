import {
  applyDecorators,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';

import { isAllowedOrigin } from './allowedOrigins';

export const OriginGuard = (isOriginAllowed: (origin: string) => boolean = isAllowedOrigin) => {
  class OriginGuardImpl implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
      if (process.env.NODE_ENV === 'test') {
        return true;
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const request = context.switchToHttp().getRequest();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const origin: string = request.headers.origin ?? '';

      if (!isOriginAllowed(origin)) {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      }

      return true;
    }
  }

  return applyDecorators(UseGuards(OriginGuardImpl));
};
