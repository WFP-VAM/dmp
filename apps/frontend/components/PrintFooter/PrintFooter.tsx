import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { FormattedMessage } from 'react-intl';

export const PrintFooter = (): JSX.Element => {
  return (
    <Box
      sx={{
        '@media print': {
          display: 'flex',
          flexDirection: 'column',
          padding: '2rem',
          marginTop: '-14rem',
        },
        '@media screen': {
          display: 'none',
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Grid container spacing={2} sx={{ maxWidth: '400px' }}>
          <Grid item xs={6}>
            <Typography>
              <FormattedMessage id="print_footer.date" />:
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography
              sx={{ borderBottom: '1px solid black', height: '1.5em' }}
            >
              &nbsp;
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              <FormattedMessage id="print_footer.prepared_by" />:
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography
              sx={{ borderBottom: '1px solid black', height: '1.5em' }}
            >
              &nbsp;
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              <FormattedMessage id="print_footer.role" />:
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography
              sx={{ borderBottom: '1px solid black', height: '1.5em' }}
            >
              &nbsp;
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              <FormattedMessage id="print_footer.signature" />:
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography
              sx={{ borderBottom: '1px solid black', height: '1.5em' }}
            >
              &nbsp;
            </Typography>
          </Grid>
          {/* Add any other fields here using the same pattern */}
        </Grid>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Grid container spacing={2} sx={{ maxWidth: '400px' }}>
          <Grid item xs={6}>
            <Typography>
              <FormattedMessage id="print_footer.reviewed_by" />:
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography
              sx={{ borderBottom: '1px solid black', height: '1.5em' }}
            >
              &nbsp;
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              <FormattedMessage id="print_footer.signature_stamp" />:
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography
              sx={{ borderBottom: '1px solid black', height: '1.5em' }}
            >
              &nbsp;
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
