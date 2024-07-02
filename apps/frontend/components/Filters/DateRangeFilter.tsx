import { CalendarMonth } from '@mui/icons-material';
import { Box, InputAdornment } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import React from 'react';
import { useIntl } from 'react-intl';

export interface DateRange {
  startDate?: Dayjs;
  endDate?: Dayjs;
}

interface IProps {
  value: DateRange;
  onChange: (range: DateRange) => void;
}

export const DateRangeFilter = ({ value, onChange }: IProps): JSX.Element => {
  const intl = useIntl();

  return (
    <Box display="flex" justifyContent="left">
      <DatePicker
        sx={{ mr: 2, width: 140, backgroundColor: 'white' }}
        label={
          value.startDate
            ? undefined
            : intl.formatMessage({
                id: 'validation_search_params.start_date',
              })
        }
        maxDate={dayjs(new Date())}
        value={value.startDate}
        onChange={newStartValue => {
          if (value.endDate && (newStartValue as Dayjs) > value.endDate) {
            onChange({
              ...value,
              startDate: newStartValue as Dayjs,
              endDate: newStartValue as Dayjs,
            });
          } else {
            onChange({ ...value, startDate: newStartValue as Dayjs });
          }
        }}
        slotProps={{
          inputAdornment: {
            sx: {
              display: 'none',
            },
          },
          textField: {
            InputProps: {
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarMonth />
                </InputAdornment>
              ),
            },
          },
        }}
      />

      <DatePicker
        sx={{ mr: 2, width: 140, backgroundColor: 'white' }}
        label={
          value.endDate
            ? undefined
            : intl.formatMessage({
                id: 'validation_search_params.end_date',
              })
        }
        maxDate={dayjs(new Date())}
        value={value.endDate}
        onChange={newEndValue => {
          if (value.startDate && (newEndValue as Dayjs) < value.startDate) {
            onChange({
              ...value,
              startDate: newEndValue as Dayjs,
              endDate: newEndValue as Dayjs,
            });
          } else {
            onChange({ ...value, endDate: newEndValue as Dayjs });
          }
        }}
        slotProps={{
          inputAdornment: {
            sx: {
              display: 'none',
            },
          },
          textField: {
            InputProps: {
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarMonth />
                </InputAdornment>
              ),
            },
          },
        }}
      />
    </Box>
  );
};
