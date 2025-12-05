import { LayoutWithNav } from 'components/Layout';
import { FormValidationContainer } from 'components/pages/Form/FormValidationContainer';
import { NextApplicationPage } from 'pages/_app';

const FormPage: NextApplicationPage = () => (
  <LayoutWithNav>
    <FormValidationContainer />
  </LayoutWithNav>
);

FormPage.requireAuth = true;
export default FormPage;

