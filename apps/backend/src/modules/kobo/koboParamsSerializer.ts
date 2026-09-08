import * as qs from 'qs';

// Kobo API expects the 'query' parameter as a JSON-encoded string. Shared between the internal
// KoboModule (KOBO_TOKEN) and the partners module (KOBO_PUBLIC_API_TOKEN, see
// docs/adr/003-partner-api-approach.md) since both talk to the same Kobo REST API shape.
export const koboParamsSerializer = (params: Record<string, unknown>): string => {
  const { query, ...otherParams } = params as {
    query?: string | Record<string, unknown>;
    [key: string]: unknown;
  };

  let queryString = '';
  if (query !== undefined) {
    const queryValue = typeof query === 'string' ? query : JSON.stringify(query);
    queryString = `query=${encodeURIComponent(queryValue)}`;
  }

  const otherParamsString = qs.stringify(otherParams, { arrayFormat: 'brackets' });

  if (queryString !== '' && otherParamsString !== '') {
    return `${queryString}&${otherParamsString}`;
  }

  return queryString !== '' ? queryString : otherParamsString;
};
