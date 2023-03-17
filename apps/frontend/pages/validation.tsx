import { NextPage } from 'next';

import { NavBar } from 'components/NavBar';
import { Validation } from 'components/pages/Validation';

const ValidationPage: NextPage = () => (
  <NavBar>
    <Validation />;
  </NavBar>
);

export default ValidationPage;
