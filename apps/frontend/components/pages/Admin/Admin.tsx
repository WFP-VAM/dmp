import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Typography } from '@mui/material';

export const Admin = (): JSX.Element => {
  return (
    <Box display="flex" flexDirection="row-reverse" width="100%" pr={2}>
      <Button
        variant="contained"
        size="large"
        sx={{
          borderRadius: 100,
          boxShadow: 6,
        }}
      >
        <Typography variant="body2" padding={1} textTransform="none">
          Add User
        </Typography>
        <AddIcon fontSize="medium" />
      </Button>
    </Box>
  );
};
