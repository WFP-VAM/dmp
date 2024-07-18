import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Error from '@mui/icons-material/Error';
import { Button, Stack, Tooltip, Typography } from '@mui/material';
import { ValidationStatusValue } from '@wfp-dmp/interfaces';
import { FormattedMessage } from 'react-intl';

export const ValidationIndicator = ({
  valStatus,
  textVersion = false,
}: {
  valStatus: ValidationStatusValue | undefined;
  textVersion?: boolean;
}) => {
  let id;
  let Icon;
  let color;
  switch (valStatus) {
    case ValidationStatusValue.approved:
      id = 'valStatus.approved';
      Icon = CheckCircleIcon;
      color = '#63B2BD';
      break;
    case ValidationStatusValue.notApproved:
      id = 'valStatus.notApproved';
      Icon = CancelIcon;
      color = '#D32C38';
      break;
    default:
      id = 'valStatus.onHold';
      Icon = Error;
      color = '#FCAE65';
  }

  if (textVersion) {
    return (
      <Typography display="flex" fontSize="inherit">
        <Tooltip title={<FormattedMessage id={id} />}>
          <Icon htmlColor={color} />
        </Tooltip>
        &nbsp;
        <FormattedMessage id={id} />
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
  textVersion = true,
}: {
  valStatus: ValidationStatusValue | undefined;
  valLink: string;
  textVersion?: boolean;
}) => {
  return (
    <Button
      href={valLink}
      target="_blank"
      rel="noopener noreferrer"
      variant="contained"
      disableElevation
      sx={{
        m: '-5px',
        flex: 'display',
        padding: 1,
        paddingLeft: 0.5,
        alignItems: 'center',
        fontSize: '14px',
        textTransform: 'none',
        backgroundColor: 'var(--color_table_1)',
        '&:hover': {
          backgroundColor: '#ccc',
        },
        border: '1px solid #ccc',
      }}
    >
      <ValidationIndicator valStatus={valStatus} textVersion={textVersion} />
    </Button>
  );
};
