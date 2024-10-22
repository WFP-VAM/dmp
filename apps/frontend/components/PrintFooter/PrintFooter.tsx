import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { FormattedMessage } from 'react-intl';

const FooterField = ({ messageId }: { messageId: string }) => (
  <>
    <Grid item xs={6}>
      <Typography>
        <FormattedMessage id={`print_footer.${messageId}`} />:
      </Typography>
    </Grid>
    <Grid item xs={6}>
      <Typography sx={{ borderBottom: '1px solid black', height: '1.5em' }}>
        &nbsp;
      </Typography>
    </Grid>
  </>
);

export const PrintFooter = (): JSX.Element => {
  const mainFields = ['date', 'prepared_by', 'role', 'signature'];
  const reviewFields = ['reviewed_by', 'signature_stamp'];

  return (
    <Box
      sx={{
        '@media print': {
          display: 'flex',
          flexDirection: 'column',
          padding: '2rem',
          pageBreakInside: 'avoid',
        },
        '@media screen': {
          display: 'none',
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Grid container spacing={2} sx={{ maxWidth: '400px' }}>
          {mainFields.map(field => (
            <FooterField key={field} messageId={field} />
          ))}
        </Grid>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Grid container spacing={2} sx={{ maxWidth: '400px' }}>
          {reviewFields.map(field => (
            <FooterField key={field} messageId={field} />
          ))}
        </Grid>
      </Box>
    </Box>
  );
};
