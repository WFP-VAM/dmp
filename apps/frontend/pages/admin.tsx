import { NextPage } from 'next';

import { Admin } from 'components';
import { NavBar } from 'components/NavBar';

const AdminPage: NextPage = () => (
  <NavBar>
    <Admin />
  </NavBar>
);

export default AdminPage;
