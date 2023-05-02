import { Grid, Switch } from '@mui/material';
import { ChangeEvent } from 'react';
import { FormattedMessage } from 'react-intl';

export const ReportSwitch = ({
  value,
  onChange,
}: {
  value: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
}): JSX.Element => {
  return (
    <Grid container alignItems="center" spacing={1} maxWidth={200}>
      <Grid item>
        <FormattedMessage id="report_page.brief" />
      </Grid>
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
      <Grid item>
        <FormattedMessage id="report_page.detailed" />
      </Grid>
    </Grid>
  );
};
