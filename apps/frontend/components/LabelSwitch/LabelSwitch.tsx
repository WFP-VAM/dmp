import {
  Stack,
  Switch,
  SwitchProps,
  Typography,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { ChangeEvent } from 'react';
import { FormattedMessage } from 'react-intl';

import { colors } from 'theme/muiTheme';

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 36,
  height: 26,
  padding: 0,
  alignItems: 'center',
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor:
          theme.palette.mode === 'dark' ? '#2ECA45' : colors.color5,
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    marginTop: 3,
    width: 16,
    height: 16,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    height: 20,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

interface LabelSwitchProps {
  label: string;
  value: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  labelUncheck: string;
  labelCheck: string;
}

export const LabelSwitch = ({
  label,
  value,
  onChange,
  labelUncheck,
  labelCheck,
}: LabelSwitchProps): JSX.Element => {
  const theme = useTheme();

  return (
    <Stack
      direction="row"
      gap={theme.spacing(1.5)}
      border={`1px solid ${colors.gray}`}
      borderRadius="4px"
      padding={`${theme.spacing(0.7)} ${theme.spacing(1)}`}
      style={{ background: 'white', height: '2.5rem' }}
      alignItems="center"
    >
      <Typography fontWeight="bold" fontSize="14px">
        <FormattedMessage id={label} />:
      </Typography>
      <Typography
        fontSize="14px"
        style={{
          textDecoration: !value ? 'underline' : 'none',
          textDecorationColor: colors.color5,
          textUnderlineOffset: '4px',
          textDecorationThickness: '2px',
        }}
      >
        <FormattedMessage id={labelUncheck} />
      </Typography>
      <IOSSwitch checked={value} onChange={onChange} />
      <Typography
        fontSize="14px"
        style={{
          textDecoration: value ? 'underline' : 'none',
          textDecorationColor: colors.color5,
          textUnderlineOffset: '4px',
          textDecorationThickness: '2px',
        }}
      >
        <FormattedMessage id={labelCheck} />
      </Typography>
    </Stack>
  );
};
