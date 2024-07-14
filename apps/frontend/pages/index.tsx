import { Home } from 'components';
import { LayoutWithNav } from 'components/Layout';

import { NextApplicationPage } from './_app';

const HomePage: NextApplicationPage = () => (
  <LayoutWithNav layoutProps={{ alignItems: 'center' }}>
    <Home />
  </LayoutWithNav>
);

HomePage.requireAuth = true;

export default HomePage;
