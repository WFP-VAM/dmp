import { CalendarMonth } from '@mui/icons-material';
import { InputAdornment, Stack, useTheme } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import React, { useState } from 'react';
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
  const theme = useTheme();
  const [startOpen, setStartOpen] = useState(false);
  const [endOpen, setEndOpen] = useState(false);

  return (
    <Stack direction="row" gap={theme.spacing(1)}>
      <DatePicker
        sx={{
          width: 140,
          backgroundColor: 'white',
          '& .MuiInputBase-input': {
            padding: '0.5rem 0.5rem',
            fontSize: '14px !important',
          },
        }}
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
        open={startOpen}
        onOpen={() => setStartOpen(true)}
        onClose={() => setStartOpen(false)}
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
              onClick: () => setStartOpen(true), // Open calendar on click
              sx: {
                cursor: 'pointer',
                height: '2.5rem',
              },
            },
          },
        }}
      />

      <DatePicker
        sx={{
          width: 140,
          backgroundColor: 'white',
          '& .MuiInputBase-input': {
            padding: '0.5rem 0.5rem',
            fontSize: '14px !important',
          },
        }}
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
        open={endOpen}
        onOpen={() => setEndOpen(true)}
        onClose={() => setEndOpen(false)}
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
              onClick: () => setEndOpen(true), // Open calendar on click
              sx: {
                cursor: 'pointer',
                height: '2.5rem',
              },
            },
          },
        }}
      />
    </Stack>
  );
};
