import { Button } from '@mui/material';
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
      <Button sx={{ color: 'white', float: 'right' }} type="submit">
        <FormattedMessage
          id="navigation.forms.search"
          defaultMessage="Hide password"
        />
      </Button>
    </form>
  );
};
