import { Box, Button } from '@mui/material';
import { DisasterMapping } from '@wfp-dmp/interfaces';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

import { DisasterFilter } from 'components/Filters';
import { useForms } from 'services/forms/useForms';

export const FormSearch = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: { DisTyp: '1' },
  });

  const defaultDisaster = DisasterMapping['flood'];
  const [disasterType, setDisasterType] = useState(defaultDisaster);

  const submitHandler = (data: { DisTyp: string }) => {
    setDisasterType(data.DisTyp);
  };
  const forms = useForms(disasterType);

  return (
    <Box display="flex" flexDirection="column">
      <Box>
        <form onSubmit={handleSubmit(submitHandler)}>
          <DisasterFilter control={control} />
          <Button sx={{ color: 'white', float: 'right' }} type="submit">
            <FormattedMessage
              id="navigation.forms.search"
              defaultMessage="Hide password"
            />
          </Button>
        </form>
      </Box>
      <Box>{JSON.stringify(forms)}</Box>
    </Box>
  );
};
