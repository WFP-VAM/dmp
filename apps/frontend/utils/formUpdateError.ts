import { KOBO_WRITE_FORBIDDEN } from '@wfp-dmp/interfaces';
import { isAxiosError } from 'axios';

export const FORM_PAGE_WRITE_ACCESS_DISABLED = 'form_page.write_access_disabled';

const readMessageField = (message: unknown): string | undefined => {
  if (typeof message === 'string' && message.trim() !== '') {
    return message;
  }

  if (Array.isArray(message)) {
    const parts = message.filter(
      (part): part is string => typeof part === 'string' && part.trim() !== '',
    );

    return parts.length > 0 ? parts.join(' ') : undefined;
  }

  return undefined;
};

export const isKoboWriteForbiddenError = (error: unknown): boolean => {
  if (!isAxiosError(error)) {
    return false;
  }

  const data = error.response?.data as { code?: unknown } | undefined;

  return data?.code === KOBO_WRITE_FORBIDDEN;
};

export const getFormUpdateErrorMessage = (
  error: unknown,
  fallback: string,
): string => {
  if (!isAxiosError(error) || isKoboWriteForbiddenError(error)) {
    return fallback;
  }

  const data = error.response?.data;

  if (typeof data === 'string' && data.trim() !== '') {
    return data;
  }

  if (typeof data === 'object' && data !== null) {
    const fromMessage = readMessageField(
      (data as { message?: unknown }).message,
    );
    if (fromMessage !== undefined) {
      return fromMessage;
    }
  }

  return fallback;
};
