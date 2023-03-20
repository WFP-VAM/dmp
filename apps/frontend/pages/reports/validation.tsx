import { NextPage } from 'next';

import { NavBar } from 'components/NavBar';
import { ReportValidation } from 'components/pages/Reports';

const ValidationPage: NextPage = () => (
  <NavBar>
    <ReportValidation />
  </NavBar>
);

export default ValidationPage;
