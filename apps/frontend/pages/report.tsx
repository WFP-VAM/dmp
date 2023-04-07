import { NextPage } from 'next';

import { LayoutWithNav } from 'components/Layout';
import { ReportContainer } from 'components/pages/Report';

const ReportPage: NextPage = () => (
  <LayoutWithNav>
    <ReportContainer />
  </LayoutWithNav>
);

export default ReportPage;
