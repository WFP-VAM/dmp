import { User } from '@modules/user/user.entity';
import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';

type RequestWithUser = {
  user: User;
};

const isRequestWithUser = (request: unknown): request is RequestWithUser =>
  request !== null && typeof request === 'object' && 'user' in request;

export const UseUser = createParamDecorator((data: unknown, ctx: ExecutionContext): User => {
  const request = ctx.switchToHttp().getRequest<unknown>();

  if (!isRequestWithUser(request)) {
    throw new InternalServerErrorException();
  }

  return request.user;
});

// return undefined if ncdm or admin else return the province
export const UseProvince = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string | undefined => {
    const request = ctx.switchToHttp().getRequest<unknown>();

    if (!isRequestWithUser(request)) {
      throw new InternalServerErrorException();
    }

    const user = request.user;

    if (user.roles.includes('admin') || user.roles.includes('ncdm')) return undefined;

    // Every pcdm should have a province associated with their profile
    // issue:typeorm don't accept string | null for province
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (user.province === undefined || user.province === null || user.province === '') {
      throw new InternalServerErrorException("User doesn't have an associated province");
    }

    return user.province;
  },
);
