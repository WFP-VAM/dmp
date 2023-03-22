import { Box } from '@mui/material';
import { DisasterMapping } from '@wfp-dmp/interfaces';
import { useState } from 'react';

import { SearchFilters } from 'components/Filters/SearchFilters';
import { useForms } from 'services/forms/useForms';

export const FormSearch = () => {
  const defaultDisaster = DisasterMapping['flood'];
  const [disasterType, setDisasterType] = useState(defaultDisaster);

  const forms = useForms(disasterType);

  return (
    <Box display="flex" flexDirection="column">
      <SearchFilters setDisasterType={setDisasterType} />
      <Box>{JSON.stringify(forms)}</Box>
    </Box>
  );
};
