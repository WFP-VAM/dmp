import { NextPage } from 'next';

import { LayoutWithNav } from 'components/Layout';
import { FormSearch } from 'components/pages/Forms';

const SearchFormsPage: NextPage = () => (
  <LayoutWithNav>
    <FormSearch />
  </LayoutWithNav>
);

export default SearchFormsPage;
