import { NextRouter } from 'next/router';

export const buildRedirectUrl = (router: NextRouter): string => {
  const { pathname, query } = router;
  const queryString = new URLSearchParams(
    query as unknown as URLSearchParams,
  ).toString();

  if (queryString !== '') {
    return `${pathname}?${queryString}`;
  }

  return pathname;
};
