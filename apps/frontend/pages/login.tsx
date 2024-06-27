import { NextPage } from 'next';

import { Login } from 'components';
import { Layout } from 'components/Layout';

const LoginPage: NextPage = () => (
  <Layout alignItems="center" backgroundColor="#f5f5f5">
    <Login />
  </Layout>
);

export default LoginPage;
