import { Reflector } from '@nestjs/core';

import { CustomAuthGuard } from '../auth.guard';
import { getExecutionContextFromRequest } from './testUtils';

describe('CustomAuthGuard', () => {
  const reflector = {
    get: jest.fn().mockReturnValue(false),
  } as unknown as Reflector;

  it('skips JWT when originalUrl is under /admin even if url is rewritten', () => {
    const guard = new CustomAuthGuard(reflector);
    const context = getExecutionContextFromRequest({
      url: '/login',
      originalUrl: '/admin/login',
    });

    expect(guard.canActivate(context)).toBe(true);
  });

  it('skips JWT when url is under /admin', () => {
    const guard = new CustomAuthGuard(reflector);
    const context = getExecutionContextFromRequest({
      url: '/admin/login?next=/admin',
    });

    expect(guard.canActivate(context)).toBe(true);
  });
});
