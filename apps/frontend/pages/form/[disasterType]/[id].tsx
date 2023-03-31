import { NextPage } from 'next';

import { LayoutWithNav } from 'components/Layout';
import { FormValidationContainer } from 'components/pages/Form/FormValidationContainer';

const FormPage: NextPage = () => (
  <LayoutWithNav>
    <FormValidationContainer />
  </LayoutWithNav>
);

export default FormPage;
