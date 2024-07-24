import { PhoneAndroid } from '@mui/icons-material';
import {
  InputAdornment,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { FloodSpecific } from '@wfp-dmp/interfaces';
import { Control, Controller } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

import { DisasterSelect } from 'components/FormValidation/DisasterSelect';
import { colors } from 'theme/muiTheme';

import { FloodFormType } from './FloodFormType';

interface FloodHeaderProps {
  control: Control<FloodFormType>;
  isEditMode: boolean;
}

const FloodHeader = ({ control, isEditMode }: FloodHeaderProps) => {
  const theme = useTheme();

  return (
    <Stack gap={theme.spacing(2)}>
      <Stack direction="row" gap={theme.spacing(4)}>
        <Stack direction="row" gap={theme.spacing(2)} alignItems="center">
          <Typography color={colors.gray2}>
            <FormattedMessage id="validation_search_params.location" />
          </Typography>
          {/* <Controller
            name="region"
            control={control}
            render={({ field: { value, onChange } }) => (
              <RegionFilters
                value={{
                  province: [value.province],
                  district: [value.district],
                  commune: [value.commune],
                }}
                onChange={onChange}
                disableAll={!isEditMode}
              />
            )}
          /> */}
        </Stack>
        <Stack direction="row" gap={theme.spacing(1)} alignItems="center">
          <Typography width="3rem" color={colors.gray2}>
            <FormattedMessage id="forms_table.headers.entry_date" />
          </Typography>
          <Controller
            name="reportDate"
            control={control}
            render={({ field: { value, onChange } }) => (
              <DatePicker
                disabled={!isEditMode}
                value={value}
                onChange={onChange}
                sx={{ width: 150 }}
                slotProps={{
                  inputAdornment: {
                    position: 'start',
                  },
                }}
              />
            )}
          />
        </Stack>
        <Stack direction="row" gap={theme.spacing(1)} alignItems="center">
          <Typography width="5rem" color={colors.gray2}>
            <FormattedMessage id="forms_table.headers.dis_date" />
          </Typography>
          <Controller
            name="incidentDate"
            control={control}
            render={({ field: { value, onChange } }) => (
              <DatePicker
                disabled={!isEditMode}
                value={value}
                onChange={onChange}
                sx={{ width: 150 }}
                slotProps={{
                  inputAdornment: {
                    position: 'start',
                  },
                }}
              />
            )}
          />
        </Stack>
      </Stack>
      <Stack
        direction="row"
        gap={theme.spacing(4)}
        justifyContent="space-between"
      >
        <Stack direction="row" gap={theme.spacing(5)}>
          <Controller
            name="disTyp"
            control={control}
            render={({ field: { value, onChange } }) => (
              <DisasterSelect
                disabled={!isEditMode}
                value={value}
                onChange={onChange}
                showLabel={false}
              />
            )}
          />
          <Stack direction="row" gap={theme.spacing(1)} alignItems="center">
            <Typography width="5rem" color={colors.gray2}>
              <FormattedMessage id="table.FLOOD.floodN" />
            </Typography>
            <Controller
              name="specific"
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  disabled={!isEditMode}
                  type="number"
                  value={value.floodN}
                  sx={{ width: 75 }}
                  onChange={event =>
                    onChange({
                      ...value,
                      [FloodSpecific.floodN]: event.target.value,
                    })
                  }
                />
              )}
            />
          </Stack>
          <Stack direction="row" gap={theme.spacing(1)} alignItems="center">
            <Typography width="5rem" color={colors.gray2}>
              <FormattedMessage id="forms_table.headers.entry_name" />
            </Typography>
            <Controller
              name="interviewer"
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  disabled={!isEditMode}
                  value={value}
                  onChange={onChange}
                  sx={{ width: 200 }}
                />
              )}
            />
          </Stack>
          <Stack direction="row" gap={theme.spacing(1)} alignItems="center">
            <Typography width="5rem" color={colors.gray2}>
              <FormattedMessage id="forms_table.headers.phone" />
            </Typography>
            <Controller
              name="phone"
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneAndroid />
                      </InputAdornment>
                    ),
                  }}
                  disabled={!isEditMode}
                  type="tel"
                  value={value}
                  onChange={onChange}
                  sx={{ width: 200 }}
                />
              )}
            />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default FloodHeader;
