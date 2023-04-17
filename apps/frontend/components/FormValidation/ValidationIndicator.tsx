import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import { Stack } from '@mui/material';
import { DisasterDtoType, ValidationStatusValue } from '@wfp-dmp/interfaces';
import { FormattedMessage } from 'react-intl';
export const ValidationIndicator = ({
  form,
}: {
  form: DisasterDtoType | undefined;
}) => {
  if (form === undefined) {
    return <></>;
  }
  const valStatus = form._validation_status.uid;
  let id;
  let icon;
  let color;
  switch (valStatus) {
    case ValidationStatusValue.approved:
      id = 'valStatus.approved';
      icon = <CheckCircleIcon />;
      color = 'green';
      break;
    case ValidationStatusValue.notApproved:
      id = 'valStatus.notApproved';
      icon = <CancelIcon />;
      color = 'red';
      break;
    case ValidationStatusValue.onHold:
      id = 'valStatus.onHold';
      icon = <PendingIcon />;
      color = 'yellow';
      break;
    default:
      id = 'valStatus.onHold';
      icon = <PendingIcon />;
      color = 'yellow';
  }

  return (
    <Stack
      direction="row"
      alignItems="center"
      gap={1}
      sx={{ backgroundColor: color, m: 2, p: 1 }}
    >
      {icon}
      <FormattedMessage id={id} />
    </Stack>
  );
};
