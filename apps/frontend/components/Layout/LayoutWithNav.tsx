import { ReactNode } from 'react';

import { NavBar } from 'components/NavBar';

import { Layout } from './Layout';

interface Props {
  children: ReactNode;
}
export const LayoutWithNav = ({ children }: Props): JSX.Element => {
  return (
    <NavBar>
      <Layout>{children}</Layout>
    </NavBar>
  );
};
