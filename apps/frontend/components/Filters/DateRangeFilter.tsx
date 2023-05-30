import { Box } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import React from 'react';
import { useIntl } from 'react-intl';

export interface DateRange {
  startDate: Dayjs;
  endDate: Dayjs;
}

interface IProps {
  value: DateRange;
  onChange: (range: DateRange) => void;
}

export const DateRangeFilter = ({ value, onChange }: IProps): JSX.Element => {
  const intl = useIntl();

  return (
    <Box display="flex" justifyContent="center" mb={3}>
      <DatePicker
        label={intl.formatMessage({
          id: 'validation_search_params.start_date',
        })}
        maxDate={dayjs(new Date())}
        value={value.startDate}
        onChange={newStartValue => {
          if ((newStartValue as Dayjs) > value.endDate) {
            onChange({
              ...value,
              startDate: newStartValue as Dayjs,
              endDate: newStartValue as Dayjs,
            });
          } else {
            onChange({ ...value, startDate: newStartValue as Dayjs });
          }
        }}
        sx={{ mr: 3 }}
      />

      <DatePicker
        label={intl.formatMessage({
          id: 'validation_search_params.end_date',
        })}
        maxDate={dayjs(new Date())}
        value={value.endDate}
        onChange={newEndValue => {
          if ((newEndValue as Dayjs) < value.startDate) {
            onChange({
              ...value,
              startDate: newEndValue as Dayjs,
              endDate: newEndValue as Dayjs,
            });
          } else {
            onChange({ ...value, endDate: newEndValue as Dayjs });
          }
        }}
      />
    </Box>
  );
};
