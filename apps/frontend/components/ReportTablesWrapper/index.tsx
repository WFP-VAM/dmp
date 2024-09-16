import { Stack, useTheme } from '@mui/material';

type ReportTablesWrapperProps = React.PropsWithChildren;

const ReportTablesWrapper = ({ children }: ReportTablesWrapperProps) => {
  const theme = useTheme();

  return (
    // Print does not allow us to have page padding
    <Stack sx={{ gap: theme.spacing(4), '@media print': { gap: 0 } }}>
      {children}
    </Stack>
  );
};

export default ReportTablesWrapper;
