import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import { Stack, Tooltip, Typography } from '@mui/material';
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
      color = 'green';
      break;
    case ValidationStatusValue.notApproved:
      id = 'valStatus.notApproved';
      Icon = CancelIcon;
      color = 'red';
      break;
    default:
      id = 'valStatus.onHold';
      Icon = PendingIcon;
      color = 'yellow';
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
