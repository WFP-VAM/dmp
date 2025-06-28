import { NavBar } from 'components/NavBar';

import { Layout, LayoutProps } from './Layout';

interface LayoutWithNavProps {
  layoutProps?: LayoutProps;
}

export const LayoutWithNav = ({
  children,
  layoutProps = {},
}: React.PropsWithChildren<LayoutWithNavProps>): JSX.Element => {
  return (
    <NavBar>
      <Layout {...layoutProps}>{children}</Layout>
    </NavBar>
  );
};
