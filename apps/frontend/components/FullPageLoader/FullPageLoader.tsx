import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const boxStyle = {
  alignItems: 'center',
  display: 'flex',
  height: '100vh',
  justifyContent: 'center',
  width: '100%',
};

export const FullPageLoader = () => {
  return (
    <Box sx={boxStyle}>
      <CircularProgress />
    </Box>
  );
};
