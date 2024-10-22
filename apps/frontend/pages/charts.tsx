import { LayoutWithNav } from 'components/Layout';
import { ChartsContainer } from 'components/pages/Charts';

import { NextApplicationPage } from './_app';

const ChartPage: NextApplicationPage = () => (
  <LayoutWithNav>
    <ChartsContainer />
  </LayoutWithNav>
);

ChartPage.requireAuth = true;

export default ChartPage;
