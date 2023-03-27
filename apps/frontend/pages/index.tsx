import { NextPage } from 'next';

import { Home } from 'components';
import { NavBar } from 'components/NavBar';

const HomePage: NextPage = () => (
  <NavBar>
    <Home />
  </NavBar>
);

export default HomePage;
