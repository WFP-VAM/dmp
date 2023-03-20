import { NextPage } from 'next';

import { NavBar } from 'components/NavBar';
import { FormSearch } from 'components/pages/Forms';

const ValidationPage: NextPage = () => (
  <NavBar>
    <FormSearch />
  </NavBar>
);

export default ValidationPage;
