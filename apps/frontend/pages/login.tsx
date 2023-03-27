import { NextPage } from 'next';

import { Login } from 'components';
import { Layout } from 'components/Layout';

const LoginPage: NextPage = () => (
  <Layout>
    <Login />
  </Layout>
);

export default LoginPage;
