import { Box, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { Control, Controller } from 'react-hook-form';
import { useIntl } from 'react-intl';

import { RegionFilters } from 'components/Filters/RegionFilters';

import { DisasterSelect } from './DisasterSelect';

const minWidth = 240;

interface IProps {
  control: Control<{
    region: {
      province: string;
      district: string;
      commune: string;
    };
    interviewer: string;
    disTyp: string;
    phone: string;
    reportDate: dayjs.Dayjs;
    incidentDate: dayjs.Dayjs;
  }>;
  isEditMode: boolean;
}

export const CommonFormFields = ({
  control,
  isEditMode,
}: IProps): JSX.Element => {
  const intl = useIntl();

  return (
    <Box display="flex" flexDirection="column" justifyContent={'center'}>
      <Box display="flex" flexDirection="row">
        <Box mr={7}>
          <Controller
            name="disTyp"
            control={control}
            render={({ field: { value, onChange } }) => (
              <DisasterSelect
                disabled={!isEditMode}
                value={value}
                onChange={onChange}
              />
            )}
          />
        </Box>
        <Controller
          name="region"
          control={control}
          render={({ field: { value, onChange } }) => (
            <RegionFilters
              value={value}
              onChange={onChange}
              disableAll={!isEditMode}
            />
          )}
        />
      </Box>
      <Box display="flex" flexDirection="row" sx={{ m: 2, mt: 5 }}>
        <Box sx={{ mr: 6 }}>
          <Controller
            name="interviewer"
            control={control}
            render={({ field: { value, onChange } }) => (
              <TextField
                disabled={!isEditMode}
                label={intl.formatMessage({
                  id: 'forms_table.headers.entry_name',
                })}
                value={value}
                onChange={onChange}
                sx={{ minWidth: minWidth }}
              />
            )}
          />
        </Box>
        <Controller
          name="phone"
          control={control}
          render={({ field: { value, onChange } }) => (
            <TextField
              disabled={!isEditMode}
              label={intl.formatMessage({
                id: 'forms_table.headers.phone',
              })}
              type="number"
              value={value}
              onChange={onChange}
              sx={{ minWidth: minWidth }}
            />
          )}
        />
      </Box>
      <Box display="flex" flexDirection="row" sx={{ m: 2, mt: 5 }}>
        <Box mr={6}>
          <Controller
            name="reportDate"
            control={control}
            render={({ field: { value, onChange } }) => (
              <DatePicker
                disabled={!isEditMode}
                label={intl.formatMessage({
                  id: 'forms_table.headers.entry_date',
                })}
                value={value}
                onChange={onChange}
                sx={{ minWidth: minWidth }}
              />
            )}
          />
        </Box>
        <Controller
          name="incidentDate"
          control={control}
          render={({ field: { value, onChange } }) => (
            <DatePicker
              disabled={!isEditMode}
              label={intl.formatMessage({
                id: 'forms_table.headers.dis_date',
              })}
              value={value}
              onChange={onChange}
              sx={{ minWidth: minWidth }}
            />
          )}
        />
      </Box>
    </Box>
  );
};
