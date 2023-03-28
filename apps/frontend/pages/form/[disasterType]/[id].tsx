import { NextPage } from 'next';

import { LayoutWithNav } from 'components/Layout';
import { FormValidation } from 'components/pages/Form';

const FormPage: NextPage = () => (
  <LayoutWithNav>
    <FormValidation />
  </LayoutWithNav>
);

export default FormPage;
