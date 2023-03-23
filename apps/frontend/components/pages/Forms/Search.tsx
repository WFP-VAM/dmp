import { Box } from '@mui/material';
import { DisasterMapping } from '@wfp-dmp/interfaces';
import { useState } from 'react';

import { SearchFilters } from 'components/Filters/SearchFilters';
import { TableDisplay } from 'components/TableDisplay';
import { useForms } from 'services/api/kobo/useForms';

export const FormSearch = () => {
  const defaultDisaster = DisasterMapping['flood'];
  const [disasterType, setDisasterType] = useState(defaultDisaster);

  const forms = useForms(disasterType);

  return (
    <Box display="flex" flexDirection="column">
      <SearchFilters setDisasterType={setDisasterType} />
      <TableDisplay forms={forms} />
    </Box>
  );
};
