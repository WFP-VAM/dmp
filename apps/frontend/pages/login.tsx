import { NextPage } from 'next';

import { Login } from 'components';
import { Layout } from 'components/Layout';

const LoginPage: NextPage = () => (
  <Layout alignItems="center">
    <Login />
  </Layout>
);

export default LoginPage;
