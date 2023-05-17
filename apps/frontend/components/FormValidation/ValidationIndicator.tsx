import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import { Stack, Tooltip } from '@mui/material';
import { ValidationStatusValue } from '@wfp-dmp/interfaces';
import { FormattedMessage } from 'react-intl';

export const ValidationIndicator = ({
  valStatus,
  iconOnly = false,
}: {
  valStatus?: ValidationStatusValue | undefined;
  iconOnly?: boolean;
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

  if (iconOnly) {
    return (
      <Tooltip title={<FormattedMessage id={id} />}>
        <Icon htmlColor={color} />
      </Tooltip>
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
