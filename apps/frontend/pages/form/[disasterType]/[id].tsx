import { NextPage } from 'next';

import { NavBar } from 'components/NavBar';
import { FormValidation } from 'components/pages/Form';

const FormPage: NextPage = () => (
  <NavBar>
    <FormValidation />
  </NavBar>
);

export default FormPage;
