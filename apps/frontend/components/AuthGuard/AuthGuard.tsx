import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { mutate } from 'swr';

import { FullPageLoader } from 'components/FullPageLoader';
import { Pages } from 'constant';
import { useAuth } from 'context/auth';
import { ApiRoutes } from 'services/api/apiRoutes';
import {
  getNetworkErrorMessage,
  isNetworkError,
} from 'services/errors/network-error';

type AuthGuardProps = {
  children: JSX.Element;
};

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const { user, isLoading, error } = useAuth();
  const router = useRouter();

  const redirectUrl = ![',', '/'].includes(router.asPath)
    ? `?redirect=${router.asPath}`
    : '';

  // Check if error is a network error (backend down, timeout, DNS issues, etc.)
  const networkError =
    error !== null && error !== undefined && isNetworkError(error);

  // Manual retry function - use global mutate to revalidate the auth endpoint
  const handleRetry = () => {
    void mutate(ApiRoutes.me);
  };

  useEffect(() => {
    // Only redirect to login if it's not a network error
    // Network errors mean the backend is down, so login won't work either
    if (!isLoading && user === undefined && !networkError) {
      void router.push(`${Pages.Login}${redirectUrl}`);
    }
  }, [isLoading, router, user, redirectUrl, networkError]);

  if (isLoading) {
    return <FullPageLoader />;
  }

  // Show error message if backend is down
  if (networkError) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          gap: 2,
          px: 2,
          maxWidth: 600,
          mx: 'auto',
        }}
      >
        <Typography variant="h5" component="h1">
          Service Unavailable
        </Typography>
        <Typography variant="body1" color="text.secondary" align="center">
          {getNetworkErrorMessage(error)}
        </Typography>
        <Button variant="contained" onClick={handleRetry} sx={{ mt: 2 }}>
          Retry
        </Button>
        <Typography
          variant="caption"
          color="text.secondary"
          align="center"
          sx={{ mt: 2 }}
        >
          If the problem persists, try:
          <br />
          • Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
          <br />
          • Clearing your browser cache
          <br />• Using incognito/private browsing mode
        </Typography>
      </Box>
    );
  }

  if (user) {
    return <>{children}</>;
  }

  return null;
};
