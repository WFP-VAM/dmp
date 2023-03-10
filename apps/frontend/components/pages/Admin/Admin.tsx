import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Typography } from '@mui/material';

export const Admin = (): JSX.Element => {
  return (
    <Box display="flex" flexDirection="row-reverse" width="100%" pr={2}>
      <Button variant="contained" size="large" sx={{ borderRadius: 100 }}>
        <Typography variant="h6" padding={1}>
          Add User
        </Typography>
        <AddIcon sx={{ ml: 1 }} />
      </Button>
    </Box>
  );
};
