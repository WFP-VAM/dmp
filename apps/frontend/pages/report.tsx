import { LayoutWithNav } from 'components/Layout';
import { ReportContainer } from 'components/pages/Report';

import { NextApplicationPage } from './_app';

const ReportPage: NextApplicationPage = () => (
  <LayoutWithNav>
    <ReportContainer />
  </LayoutWithNav>
);

ReportPage.requireAuth = true;

export default ReportPage;
