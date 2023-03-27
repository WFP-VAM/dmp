import { NextPage } from 'next';

import { LayoutWithNav } from 'components/Layout';
import { Profile } from 'components/pages/Profile';

const ProfilePage: NextPage = () => (
  <LayoutWithNav>
    <Profile />
  </LayoutWithNav>
);

export default ProfilePage;
