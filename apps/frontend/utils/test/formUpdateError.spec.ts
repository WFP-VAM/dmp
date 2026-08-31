import { KOBO_WRITE_FORBIDDEN } from '@wfp-dmp/interfaces';
import { AxiosError } from 'axios';

import {
  getFormUpdateErrorMessage,
  isKoboWriteForbiddenError,
} from 'utils/formUpdateError';

const axiosErrorWith = (data: unknown, status = 403): AxiosError =>
  new AxiosError('Request failed', 'ERR_BAD_REQUEST', undefined, undefined, {
    status,
    statusText: 'Forbidden',
    data,
    headers: {},
    config: {} as never,
  });

describe('formUpdateError', () => {
  const fallback = 'Unable to update this form. Please try again.';

  it('detects KOBO_WRITE_FORBIDDEN for i18n', () => {
    expect(
      isKoboWriteForbiddenError(
        axiosErrorWith({
          code: KOBO_WRITE_FORBIDDEN,
          message: 'ignored english payload',
        }),
      ),
    ).toBe(true);
    expect(
      isKoboWriteForbiddenError(axiosErrorWith({ message: 'Forbidden' })),
    ).toBe(false);
  });

  it('joins validation message arrays', () => {
    expect(
      getFormUpdateErrorMessage(
        axiosErrorWith({
          message: ['id must be a string', 'disasterType must be a valid enum'],
        }),
        fallback,
      ),
    ).toBe('id must be a string disasterType must be a valid enum');
  });

  it('uses fallback when there is no backend message', () => {
    expect(getFormUpdateErrorMessage(new Error('boom'), fallback)).toBe(
      fallback,
    );
    expect(getFormUpdateErrorMessage(axiosErrorWith({}), fallback)).toBe(
      fallback,
    );
  });
});
