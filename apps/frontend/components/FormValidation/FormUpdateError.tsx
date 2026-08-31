import { Alert, Snackbar } from '@mui/material';
import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from 'react';
import { useIntl } from 'react-intl';

import {
  FORM_PAGE_WRITE_ACCESS_DISABLED,
  getFormUpdateErrorMessage,
  isKoboWriteForbiddenError,
} from 'utils/formUpdateError';

const FormUpdateErrorContext = createContext<
  ((error: unknown) => void) | undefined
>(undefined);

export const useShowFormUpdateError = (): ((error: unknown) => void) => {
  const showError = useContext(FormUpdateErrorContext);
  if (showError === undefined) {
    throw new Error(
      'useShowFormUpdateError must be used within FormUpdateErrorProvider',
    );
  }

  return showError;
};

export const FormUpdateErrorProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const intl = useIntl();
  const [message, setMessage] = useState<string | null>(null);

  const showError = useCallback(
    (error: unknown) => {
      console.error('Error updating form:', error);
      setMessage(
        isKoboWriteForbiddenError(error)
          ? intl.formatMessage({ id: FORM_PAGE_WRITE_ACCESS_DISABLED })
          : getFormUpdateErrorMessage(
              error,
              intl.formatMessage({ id: 'form_page.action_error' }),
            ),
      );
    },
    [intl],
  );

  return (
    <FormUpdateErrorContext.Provider value={showError}>
      {children}
      <Snackbar
        open={message !== null}
        onClose={() => {
          setMessage(null);
        }}
        autoHideDuration={12000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          severity="error"
          variant="filled"
          onClose={() => {
            setMessage(null);
          }}
          sx={{ maxWidth: 560 }}
        >
          {message}
        </Alert>
      </Snackbar>
    </FormUpdateErrorContext.Provider>
  );
};
