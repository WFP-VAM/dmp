import { Box, Button } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

import { DisasterFilter } from './DisasterFilter';

export const SearchFilters = ({
  setDisasterType,
}: {
  setDisasterType: Dispatch<SetStateAction<string>>;
}): JSX.Element => {
  const { control, handleSubmit } = useForm({
    defaultValues: { DisTyp: '1' },
  });

  const submitHandler = (data: { DisTyp: string }) => {
    setDisasterType(data.DisTyp);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <DisasterFilter control={control} />
      <Box display="flex" justifyContent="center" mb={2}>
        <Button sx={{ color: 'white' }} type="submit">
          <FormattedMessage
            id="navigation.forms.search"
            defaultMessage="Search"
          />
        </Button>
      </Box>
    </form>
  );
};
