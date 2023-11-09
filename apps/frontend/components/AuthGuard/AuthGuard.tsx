import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { FullPageLoader } from 'components/FullPageLoader';
import { Pages } from 'constant';
import { useAuth } from 'context/auth';
import { buildRedirectUrl } from 'services/url-builder';

type AuthGuardProps = {
  children: JSX.Element;
};

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  const redirectUrl = buildRedirectUrl(router);

  useEffect(() => {
    if (!isLoading && !user) {
      void router.push(`${Pages.Login}?redirect=${redirectUrl}`);
    }
  }, [isLoading, router, user, redirectUrl]);

  if (isLoading) {
    return <FullPageLoader />;
  }

  if (user) {
    return <>{children}</>;
  }

  return null;
};
