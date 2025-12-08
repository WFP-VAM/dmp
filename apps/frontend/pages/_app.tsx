import 'styles/global.css';
import 'styles/stylesheet.css';
import 'styles/tableFormatting.css';
import { ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AxiosError, isAxiosError } from 'axios';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import React from 'react';
import ReactDOM from 'react-dom';
import { SWRConfig, SWRConfiguration } from 'swr';

import { AppCrashFallback, ErrorBoundary } from 'components';
import { AuthGuard } from 'components/AuthGuard/AuthGuard';
import { LanguageWrapper } from 'context';
import { AuthProvider } from 'context/auth';
import { Intl } from 'providers';
import { apiClient } from 'services/api/client';
import { muiTheme } from 'theme/muiTheme';

if (process.env.NODE_ENV !== 'production' && typeof window !== 'undefined') {
  void import('@axe-core/react').then(({ default: reactAxe }) => {
    const ACCESSIBILITY_CHECK_DELAY = 1000;

    return reactAxe(React, ReactDOM, ACCESSIBILITY_CHECK_DELAY);
  });
}

export type NextApplicationPage<P = unknown, IP = unknown> = NextPage<P, IP> & {
  requireAuth?: boolean;
};

const MyApp = ({
  Component,
  pageProps,
}: AppProps & { Component: NextApplicationPage }): JSX.Element => {
  return (
    <>
      <ThemeProvider theme={muiTheme}>
        <ErrorBoundary FallbackComponent={AppCrashFallback}>
          <LanguageWrapper>
            <Intl>
              <SWRConfig
                value={{
                  refreshInterval: 0, // disable auto refresh by interval by default
                  fetcher: (resource: string) =>
                    apiClient
                      .get<unknown>(resource)
                      .then(response => response.data),
                  // eslint-disable-next-line max-params
                  onErrorRetry: (
                    error: unknown,
                    _key: string,
                    _config: SWRConfiguration,
                    revalidate: (options?: { retryCount?: number }) => void,
                    { retryCount }: { retryCount: number },
                  ) => {
                    // Don't retry on network errors (backend down, connection refused, etc.)
                    if (isAxiosError(error)) {
                      const axiosError = error as AxiosError;
                      // Network errors (ECONNREFUSED, ETIMEDOUT, etc.) have no response
                      if (!axiosError.response) {
                        return; // Stop retrying
                      }
                      // Don't retry on 4xx errors (client errors)
                      if (
                        axiosError.response.status >= 400 &&
                        axiosError.response.status < 500
                      ) {
                        return; // Stop retrying
                      }
                    }
                    // Retry up to 3 times for other errors (5xx, etc.)
                    if (retryCount >= 3) {
                      return; // Stop retrying after 3 attempts
                    }
                    // Default retry behavior for other errors
                    setTimeout(() => revalidate({ retryCount }), 5000);
                  },
                }}
              >
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  dateFormats={{
                    keyboardDate: 'DD/MM/YYYY',
                  }}
                >
                  <AuthProvider>
                    {Component.requireAuth ?? false ? (
                      <AuthGuard>
                        <div>
                          <Component {...pageProps} />
                        </div>
                      </AuthGuard>
                    ) : (
                      <div>
                        <Component {...pageProps} />
                      </div>
                    )}
                  </AuthProvider>
                </LocalizationProvider>
              </SWRConfig>
            </Intl>
          </LanguageWrapper>
        </ErrorBoundary>
      </ThemeProvider>
    </>
  );
};

export default MyApp;
