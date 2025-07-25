import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Error from '@mui/icons-material/Error';
import { Button, Stack, Tooltip, Typography, useTheme } from '@mui/material';
import { ValidationStatusValue } from '@wfp-dmp/interfaces';
import { FormattedMessage } from 'react-intl';

type TextVersion = 'long' | 'normal' | 'none';

export const ValidationIndicator = ({
  valStatus,
  textVersion = 'none',
}: {
  valStatus: ValidationStatusValue | undefined;
  textVersion?: TextVersion;
}) => {
  const theme = useTheme();

  let id;
  let Icon;
  let color;
  switch (valStatus) {
    case ValidationStatusValue.approved:
      id = `valStatus.approved-${textVersion}`;
      Icon = CheckCircleIcon;
      color = '#63B2BD';
      break;
    case ValidationStatusValue.notApproved:
      id = `valStatus.notApproved-${textVersion}`;
      Icon = CancelIcon;
      color = '#D32C38';
      break;
    default:
      id = `valStatus.onHold-${textVersion}`;
      Icon = Error;
      color = '#FCAE65';
  }

  if (textVersion !== 'none') {
    return (
      <Typography
        display="flex"
        fontSize="inherit"
        fontWeight={textVersion === 'long' ? 'bold' : 'inherit'}
        style={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
        }}
      >
        <Stack gap={theme.spacing(1)} flexDirection="row" alignItems="center">
          <Tooltip title={<FormattedMessage id={id} />}>
            <Icon htmlColor={color} />
          </Tooltip>
          <FormattedMessage id={id} />
        </Stack>
      </Typography>
    );
  }

  return (
    <Stack
      direction="row"
      alignItems="center"
      gap={1}
      sx={{ backgroundColor: color, m: 2, p: 1 }}
    >
      <Icon />
      <FormattedMessage id={id} />
    </Stack>
  );
};

export const ValidationLinkButton = ({
  valStatus,
  valLink,
  textVersion = 'normal',
}: {
  valStatus: ValidationStatusValue | undefined;
  valLink: string;
  textVersion?: TextVersion;
}) => {
  return (
    <Button
      href={valLink}
      target="_blank"
      rel="noopener noreferrer"
      variant="contained"
      disableElevation
      sx={{
        flex: 'display',
        width: '100%',
        padding: 1,
        paddingLeft: 0.25,
        alignItems: 'center',
        fontSize: '14px',
        textTransform: 'none',
        backgroundColor: 'var(--color_table_1)',
        '&:hover': {
          backgroundColor: '#ddd',
        },
        border: '1px solid #ccc',
      }}
    >
      <ValidationIndicator valStatus={valStatus} textVersion={textVersion} />
    </Button>
  );
};
