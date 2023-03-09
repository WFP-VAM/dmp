import { NextPage } from 'next';

import { NavBar } from 'components/NavBar';
import { Profile } from 'components/pages/Profile';

const ProfilePage: NextPage = () => (
  <NavBar>
    <Profile />;
  </NavBar>
);

export default ProfilePage;
