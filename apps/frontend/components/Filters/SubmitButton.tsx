import EastIcon from '@mui/icons-material/East';
import { Button } from '@mui/material';
import { useIntl } from 'react-intl';

interface SubmitButtonProps {
  isDirty: boolean;
  submitButtonContent: JSX.Element;
  hideDisasterFilter: boolean;
  intl: ReturnType<typeof useIntl>;
}

export const SubmitButton = ({
  isDirty,
  submitButtonContent,
  intl,
}: SubmitButtonProps): JSX.Element => (
  <Button
    sx={{
      color: isDirty ? 'white' : 'black',
      padding: 1,
      height: '2.5rem',
      ml: 0,
      backgroundColor: isDirty
        ? 'var(--color_buttons_2, #d32f2f)'
        : 'var(--color_buttons_1)',
      '&:hover': {
        backgroundColor: isDirty
          ? 'var(--color_buttons_2, #d32f2f)'
          : 'var(--color_buttons_1)',
        opacity: isDirty ? 0.9 : 0.7,
      },
      transition: 'all 0.2s ease-in-out',
      boxShadow: isDirty ? '0 2px 8px rgba(211, 47, 47, 0.3)' : 'none',
    }}
    type="submit"
    title={
      isDirty
        ? intl.formatMessage({
            id: 'validation_search_params.filters_changed',
            defaultMessage: 'Filters have changed. Click to update results.',
          })
        : undefined
    }
  >
    {submitButtonContent}
    {<EastIcon style={{ marginLeft: 6, marginBottom: 2 }} />}
  </Button>
);
