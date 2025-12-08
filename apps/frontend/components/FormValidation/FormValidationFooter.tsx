/* eslint-disable complexity */
import { Cancel, Check, CheckCircle, Close, Edit } from '@mui/icons-material';
import { CircularProgress, Stack, useTheme } from '@mui/material';
import { DisasterType, ValidationStatusValue } from '@wfp-dmp/interfaces';
import { useRouter } from 'next/router';
import { FormattedMessage } from 'react-intl';

import Button from 'components/Button';
import { usePatchValidationStatus } from 'services/api/kobo/usePatchValidationStatus';
import { colors } from 'theme/muiTheme';
import { reloadPage } from 'utils/reloadPage';

import { ValidationIndicator } from './ValidationIndicator';

// Feature flag: if true, cancel navigates away; if false, cancel resets form and stays on page
const SHOULD_NAVIGATE_ON_CANCEL = false;

interface FormValidationFooterProps {
  isEditMode: boolean;
  status: ValidationStatusValue | undefined;
  setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const FormValidationFooter = ({
  isEditMode,
  status,
  setIsEditMode,
}: FormValidationFooterProps) => {
  const theme = useTheme();
  const router = useRouter();
  const { disaster: disasterType, formId: id } = router.query;

  const { trigger, isMutating } = usePatchValidationStatus(
    disasterType as DisasterType,
    id as string,
  );

  const editButtonStyles = {
    color: 'black',
    border: '1px solid #B7B7B7',
    paddingLeft: '1rem',
  };

  return (
    <>
      {/* spacer for the footer when we are fully scrolled */}
      <div style={{ minHeight: '5rem' }} />
      <Stack
        justifyContent="space-between"
        padding={`${theme.spacing(2)} ${theme.spacing(6)}`}
        style={{
          backgroundColor: 'white',
          boxShadow: '0px -2px 4px 0px #0000001A',
          zIndex: 2,
        }}
        alignItems="center"
        flexDirection="row"
        position="fixed"
        bottom={0}
        left={0}
        right={0}
      >
        <ValidationIndicator valStatus={status} textVersion="long" />
        <Stack flexDirection="row" gap={theme.spacing(5)}>
          {!isEditMode && (
            <Button
              sx={editButtonStyles}
              onClick={() => {
                setIsEditMode(true);
              }}
              startIcon={<Edit />}
            >
              <FormattedMessage id="form_page.edit" />
            </Button>
          )}
          {isEditMode && (
            <Button
              type="submit"
              sx={editButtonStyles}
              disabled={isMutating}
              startIcon={<Check />}
              endIcon={
                isMutating ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null
              }
            >
              <FormattedMessage id="form_page.submit" />
            </Button>
          )}
          {isEditMode && (
            <Button
              type="button"
              sx={editButtonStyles}
              onClick={() => {
                // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                if (SHOULD_NAVIGATE_ON_CANCEL) {
                  void router.push('/forms/search');
                } else {
                  setIsEditMode(false);
                  // Reload current page to reset form to original values
                  reloadPage(router);
                }
              }}
              disabled={isMutating}
              startIcon={<Close />}
              endIcon={
                isMutating ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null
              }
            >
              <FormattedMessage id="form_page.cancel" />
            </Button>
          )}
          <Button
            sx={{
              color: 'black',
              backgroundColor: '#FF9473',
              pl: 2,
              fontWeight: 'bold',
            }}
            disabled={isMutating}
            startIcon={<Cancel />}
            onClick={() => {
              void trigger(ValidationStatusValue.notApproved).then(() => {
                window.close();
              });
            }}
            endIcon={
              isMutating ? <CircularProgress color="inherit" size={20} /> : null
            }
          >
            <FormattedMessage id="form_page.reject" />
          </Button>
          <Button
            sx={{
              color: 'black',
              backgroundColor: colors.color5,
              pl: 2,
              fontWeight: 'bold',
            }}
            startIcon={<CheckCircle />}
            disabled={isMutating}
            onClick={() => {
              void trigger(ValidationStatusValue.approved).then(() => {
                window.close();
              });
            }}
            endIcon={
              isMutating ? <CircularProgress color="inherit" size={20} /> : null
            }
          >
            <FormattedMessage id="form_page.approve" />
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

export default FormValidationFooter;
