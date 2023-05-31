import { Grid, Switch } from '@mui/material';
import { ChangeEvent, ReactNode } from 'react';

export const LabelSwitch = ({
  value,
  onChange,
  labelUncheck,
  labelCheck,
}: {
  value: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  labelUncheck: ReactNode;
  labelCheck: ReactNode;
}): JSX.Element => {
  return (
    <Grid container alignItems="center" maxWidth={250}>
      <Grid item>{labelUncheck}</Grid>
      <Grid item>
        <Switch
          checked={value}
          onChange={onChange}
          sx={{
            '& .MuiSwitch-thumb': {
              backgroundColor: '#42A5F5',
            },
            '& .MuiSwitch-track': {
              backgroundColor: '#1976d2',
              opacity: 0.5,
            },
          }}
        />
      </Grid>
      <Grid item>{labelCheck}</Grid>
    </Grid>
  );
};
