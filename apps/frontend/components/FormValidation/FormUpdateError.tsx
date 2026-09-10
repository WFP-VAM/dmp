import { Alert, Snackbar } from '@mui/material';
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react';
import { useIntl } from 'react-intl';

import {
  FORM_PAGE_WRITE_ACCESS_DISABLED,
  getFormUpdateErrorMessage,
  isKoboWriteForbiddenError,
} from 'utils/formUpdateError';

interface FormUpdateErrorContextValue {
  showError: (error: unknown) => void;
  showMessage: (message: string) => void;
}

const FormUpdateErrorContext = createContext<
  FormUpdateErrorContextValue | undefined
>(undefined);

const useFormUpdateErrorContext = (): FormUpdateErrorContextValue => {
  const context = useContext(FormUpdateErrorContext);
  if (context === undefined) {
    throw new Error(
      'useShowFormUpdateError/useShowFormMessage must be used within FormUpdateErrorProvider',
    );
  }

  return context;
};

export const useShowFormUpdateError = (): ((error: unknown) => void) =>
  useFormUpdateErrorContext().showError;

// For client-side validation failures (e.g. a Kobo field constraint violation) that
// never reach the server, so there's no `error` to derive a message from.
export const useShowFormMessage = (): ((message: string) => void) =>
  useFormUpdateErrorContext().showMessage;

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

  const showMessage = useCallback((newMessage: string) => {
    setMessage(newMessage);
  }, []);

  return (
    <FormUpdateErrorContext.Provider value={{ showError, showMessage }}>
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
