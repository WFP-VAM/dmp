import { LayoutWithNav } from 'components/Layout';
import { FormSearch } from 'components/pages/Forms';
import { NextApplicationPage } from 'pages/_app';

const SearchFormsPage: NextApplicationPage = () => (
  <LayoutWithNav>
    <FormSearch />
  </LayoutWithNav>
);

SearchFormsPage.requireAuth = true;
export default SearchFormsPage;
