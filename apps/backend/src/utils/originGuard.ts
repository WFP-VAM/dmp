import {
  applyDecorators,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';

export const OriginGuard = (regex: RegExp) => {
  class OriginGuardImpl implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const request = context.switchToHttp().getRequest();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const origin: string = request.headers.origin ?? '';

      if (origin === '' || !regex.test(origin)) {
        throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
      }

      return true;
    }
  }

  return applyDecorators(UseGuards(OriginGuardImpl));
};
