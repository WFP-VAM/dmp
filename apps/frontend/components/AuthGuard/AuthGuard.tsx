import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { FullPageLoader } from 'components/FullPageLoader';
import { Pages } from 'constant';
import { useAuth } from 'context/auth';

type AuthGuardProps = {
  children: JSX.Element;
};

const buildRedirect = (pathName: string, queryString: string): string => {
  if (queryString !== '') {
    return `${pathName}?${queryString}`;
  }

  return pathName;
};

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathName = router.pathname;
  const queryString = new URLSearchParams(
    router.query as unknown as URLSearchParams,
  ).toString();
  const redirectUrl = buildRedirect(pathName, queryString);

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
