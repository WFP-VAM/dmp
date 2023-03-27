import { NextPage } from 'next';

import { Home } from 'components';
import { LayoutWithNav } from 'components/Layout';

const HomePage: NextPage = () => (
  <LayoutWithNav>
    <Home />
  </LayoutWithNav>
);

export default HomePage;
