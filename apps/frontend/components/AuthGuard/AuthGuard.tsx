import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { AxiosError, isAxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { FullPageLoader } from 'components/FullPageLoader';
import { Pages } from 'constant';
import { useAuth } from 'context/auth';

type AuthGuardProps = {
  children: JSX.Element;
};

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const { user, isLoading, error } = useAuth();
  const router = useRouter();

  const redirectUrl = ![',', '/'].includes(router.asPath)
    ? `?redirect=${router.asPath}`
    : '';

  // Check if error is a network error (backend down)
  const isNetworkError =
    error !== null &&
    error !== undefined &&
    isAxiosError(error) &&
    (error as AxiosError).response === undefined;

  useEffect(() => {
    // Only redirect to login if it's not a network error
    // Network errors mean the backend is down, so login won't work either
    if (!isLoading && user === undefined && !isNetworkError) {
      void router.push(`${Pages.Login}${redirectUrl}`);
    }
  }, [isLoading, router, user, redirectUrl, isNetworkError]);

  if (isLoading) {
    return <FullPageLoader />;
  }

  // Show error message if backend is down
  if (isNetworkError) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          gap: 2,
        }}
      >
        <Typography variant="h5" component="h1">
          Service Unavailable
        </Typography>
        <Typography variant="body1" color="text.secondary">
          The backend service is currently unavailable. Please try again later.
        </Typography>
      </Box>
    );
  }

  if (user) {
    return <>{children}</>;
  }

  return null;
};
