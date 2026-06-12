export const getAllowedOriginMatchers = (): Array<string | RegExp> => {
  if (typeof process.env.ALLOWED_HOST !== 'string') {
    return [];
  }

  const allowedHost = process.env.ALLOWED_HOST.startsWith('http')
    ? process.env.ALLOWED_HOST
    : `https://${process.env.ALLOWED_HOST}`;

  return [
    allowedHost,
    /https:\/\/wfp-dmp-[0-9]+.surge\.sh$/,
    /https:\/\/staging-wfp-dmp.surge\.sh$/,
    /https:\/\/([a-zA-Z0-9-]+\.)?dmp\.ovio\.org$/,
    /^http:\/\/localhost(:\d+)?$/,
  ];
};

export const isAllowedOrigin = (origin: string): boolean => {
  if (origin === '') {
    return process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test';
  }

  return getAllowedOriginMatchers().some(matcher =>
    typeof matcher === 'string' ? matcher === origin : matcher.test(origin),
  );
};
