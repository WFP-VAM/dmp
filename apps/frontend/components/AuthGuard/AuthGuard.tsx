import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { FullPageLoader } from 'components/FullPageLoader';
import { Pages } from 'constant';
import { useAuth } from 'context/auth';

type AuthGuardProps = {
  children: JSX.Element;
};

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const { user, isLoading } = useAuth();
  const Router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      void Router.push(Pages.Login);
    }
  }, [isLoading, Router, user]);

  if (isLoading) {
    return <FullPageLoader />;
  }

  if (user) {
    return <>{children}</>;
  }

  return null;
};
