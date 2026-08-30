import { isAllowedOrigin } from './allowedOrigins';

describe('allowedOrigins', () => {
  const savedNodeEnv = process.env.NODE_ENV;
  const savedAllowedHost = process.env.ALLOWED_HOST;

  afterEach(() => {
    process.env.NODE_ENV = savedNodeEnv;
    process.env.ALLOWED_HOST = savedAllowedHost;
  });

  it('does not allow localhost against production ALLOWED_HOST', () => {
    process.env.NODE_ENV = 'production';
    process.env.ALLOWED_HOST = 'https://dmp.ovio.org';

    expect(isAllowedOrigin('http://localhost:3000')).toBe(false);
    expect(isAllowedOrigin('http://localhost:5173')).toBe(false);
    expect(isAllowedOrigin('https://dmp.ovio.org')).toBe(true);
    expect(isAllowedOrigin('https://wfp-vam.github.io')).toBe(true);
  });

  it('allows localhost ports in development', () => {
    process.env.NODE_ENV = 'development';
    process.env.ALLOWED_HOST = 'https://dmp.ovio.org';

    expect(isAllowedOrigin('http://localhost:3000')).toBe(true);
    expect(isAllowedOrigin('http://localhost:5173')).toBe(true);
  });
});
