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
        <Switch checked={value} onChange={onChange} />
      </Grid>
      <Grid item>{labelCheck}</Grid>
    </Grid>
  );
};
