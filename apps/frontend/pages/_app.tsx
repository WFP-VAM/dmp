import 'styles/global.css';
import 'styles/stylesheet.css';
import 'styles/tableFormatting.css';
import { ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import React from 'react';
import ReactDOM from 'react-dom';
import { SWRConfig } from 'swr';

import { AppCrashFallback, ErrorBoundary } from 'components';
import { AuthGuard } from 'components/AuthGuard/AuthGuard';
import { LanguageWrapper } from 'context';
import { AuthProvider } from 'context/auth';
import { Intl } from 'providers';
import { defaultSWRConfig } from 'services/api/swr-config';
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
              <SWRConfig value={defaultSWRConfig}>
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
