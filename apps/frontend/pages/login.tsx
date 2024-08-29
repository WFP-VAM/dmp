import { NextPage } from 'next';

import { Login } from 'components';
import { Layout } from 'components/Layout';

const LoginPage: NextPage = () => (
  <Layout alignItems="center" backgroundColor="#f9f7f7">
    <Login />
  </Layout>
);

export default LoginPage;
