import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import { Box, Button, CircularProgress, Skeleton, Stack } from '@mui/material';
import { DisasterType, ValidationStatusValue } from '@wfp-dmp/interfaces';
import { useRouter } from 'next/router';
import { FormattedMessage } from 'react-intl';

import { FormValidation } from 'components/FormValidation/FormValidation';
import { useGetForm } from 'services/api/kobo/useGetForm';
import { usePatchValidationStatus } from 'services/api/kobo/usePatchValidationStatus';
const validationIndicator = (valStatus: ValidationStatusValue | undefined) => {
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
      sx={{ backgroundColor: color, m: 2, p: 1, borderRadius: 1 }}
    >
      {icon}
      <FormattedMessage id={id} />
    </Stack>
  );
};

export const FormValidationContainer = (): JSX.Element => {
  const router = useRouter();
  const { disasterType, id } = router.query;
  const { data: form, isLoading } = useGetForm(
    disasterType as DisasterType,
    id as string,
  );
  const { trigger, isMutating } = usePatchValidationStatus(
    disasterType as DisasterType,
    id as string,
  );

  return (
    <>
      {isLoading || form === undefined ? (
        <Skeleton sx={{ minWidth: 800, minHeight: 600 }} />
      ) : (
        <FormValidation validationForm={form} />
      )}
      <Box display="flex" flexDirection="column" alignItems="center">
        {validationIndicator(form?._validation_status.uid)}
        <Box display="flex" justifyContent="center">
          <Button
            sx={{ color: 'white', backgroundColor: 'red', mr: 2 }}
            disabled={isMutating}
            onClick={() => {
              void trigger(ValidationStatusValue.notApproved);
            }}
            endIcon={
              isMutating ? <CircularProgress color="inherit" size={20} /> : null
            }
          >
            <FormattedMessage id="form_page.reject" />
          </Button>
          <Button
            sx={{ color: 'white', backgroundColor: 'lightGreen', ml: 2 }}
            disabled={isMutating}
            onClick={() => {
              void trigger(ValidationStatusValue.approved);
            }}
            endIcon={
              isMutating ? <CircularProgress color="inherit" size={20} /> : null
            }
          >
            <FormattedMessage id="form_page.approve" />
          </Button>
        </Box>
      </Box>
    </>
  );
};
