import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

const UserCreateForm = (): JSX.Element => {
  const provinceOptions = [{ label: 'province1' }, { label: 'province2' }];
  const adminOptions = ['PCDM', 'NCDM', 'Admin'];

  const fieldWidth = 400;
  const inputWidth = fieldWidth - 40;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& .MuiTextField-root': { padding: '4px', width: inputWidth },
      }}
    >
      <TextField label="Username" variant="outlined" />
      <TextField label="Email" variant="outlined" />
      <TextField label="Password" variant="outlined" type="password" />
      <TextField label="Confirm Password" variant="outlined" type="password" />
      <Autocomplete
        disablePortal
        options={provinceOptions}
        sx={{ width: inputWidth }}
        renderInput={params => <TextField {...params} label="Province" />}
      />
      <Autocomplete
        disablePortal
        options={adminOptions}
        getOptionLabel={option => option}
        style={{ width: inputWidth }}
        renderInput={params => <TextField {...params} label="User Roles" />}
      />
      <Button size="large" variant="contained" sx={{ margin: 0.5 }}>
        <Typography variant="body1" padding={1}>
          <FormattedMessage id="admin.add_user" defaultMessage="Add User" />
        </Typography>
      </Button>
    </Box>
  );
};
interface Props {
  open: boolean;
  closeDialog: () => void;
}

const UserCreateDialog = ({ open, closeDialog }: Props): JSX.Element => {
  return (
    <Dialog open={open}>
      <Box width={440} height={495}>
        <CloseIcon
          onClick={closeDialog}
          sx={{ position: 'absolute', top: 5, right: 5 }}
        />
        <UserCreateForm />
      </Box>
    </Dialog>
  );
};

export const Admin = (): JSX.Element => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const openDialog = () => setDialogOpen(true);
  const closeDialog = () => setDialogOpen(false);

  return (
    <Box display="flex" flexDirection="row-reverse" width="100%" pr={2}>
      <Button
        variant="contained"
        size="large"
        sx={{ boxShadow: 6 }}
        onClick={openDialog}
      >
        <Typography variant="body2" padding={1}>
          <FormattedMessage id="admin.add_user" defaultMessage="Add User" />
        </Typography>
        <AddIcon fontSize="medium" />
      </Button>
      <UserCreateDialog open={dialogOpen} closeDialog={closeDialog} />
    </Box>
  );
};
