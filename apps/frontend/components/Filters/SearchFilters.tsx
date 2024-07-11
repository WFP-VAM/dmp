import EastIcon from '@mui/icons-material/East';
import { Button, Stack, Typography, useTheme } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import { DateRange, DateRangeFilter } from './DateRangeFilter';
import { DisasterFilter } from './DisasterFilter';
import { Region, RegionFilters } from './RegionFilters';

export interface SearchFormData {
  disTyps: string[];
  dateRange: DateRange;
  region: Region;
}

export const SearchFilters = ({
  initSearchFormData,
  setSearchFormData,
  submitButtonContent,
}: {
  initSearchFormData: SearchFormData;
  setSearchFormData: Dispatch<SetStateAction<SearchFormData>>;
  submitButtonContent: JSX.Element;
}): JSX.Element => {
  const theme = useTheme();
  const { control, handleSubmit } = useForm<SearchFormData>({
    defaultValues: initSearchFormData,
  });
  const intl = useIntl();

  const submitHandler = (data: SearchFormData) => {
    setSearchFormData(data);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <Stack direction="column" gap={theme.spacing(2)} width="fit-content">
        <Stack direction="row" gap={theme.spacing(4)}>
          <Stack direction="row" gap={theme.spacing(2)} alignItems="center">
            <Typography>
              <FormattedMessage id="validation_search_params.location" />
            </Typography>

            <Controller
              name="region"
              control={control}
              render={({ field: { value, onChange } }) => (
                <RegionFilters value={value} onChange={onChange} />
              )}
            />
          </Stack>

          <Stack direction="row" gap={theme.spacing(2)} alignItems="center">
            <Typography marginRight={2}>
              {intl.formatMessage({
                id: 'validation_search_params.date_range',
              })}
            </Typography>
            <Controller
              name="dateRange"
              control={control}
              render={({ field: { onChange, value } }) => (
                <DateRangeFilter value={value} onChange={onChange} />
              )}
            />
          </Stack>
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Controller
            name={'disTyps'}
            control={control}
            render={({ field: { onChange, value } }) => (
              <DisasterFilter value={value} onChange={onChange} />
            )}
          />
          <Button
            sx={{
              color: 'black',
              padding: 1,
              height: '2rem',
              ml: 2,
              backgroundColor: 'var(--color_buttons_1)',
            }}
            type="submit"
          >
            {submitButtonContent}
            {<EastIcon style={{ marginLeft: 6, marginBottom: 2 }} />}
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};
