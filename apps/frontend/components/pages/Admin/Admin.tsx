import AddIcon from '@mui/icons-material/Add';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CloseIcon from '@mui/icons-material/Close';
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Dialog,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';

const UserCreateForm = (): JSX.Element => {
  const provinceOptions = [{ label: 'province1' }, { label: 'province2' }];
  const adminOptions = ['PCDM', 'NCDM', 'Admin'];

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const fieldWidth = 400;

  return (
    <Box display="flex" flexDirection="column">
      <TextField label="Name" variant="outlined" />
      <TextField label="Email" variant="outlined" />
      <TextField label="Password" variant="outlined" type="password" />
      <TextField label="Confirm Password" variant="outlined" type="password" />
      <Autocomplete
        disablePortal
        options={provinceOptions}
        sx={{ width: fieldWidth }}
        renderInput={params => <TextField {...params} label="Province" />}
      />
      <Autocomplete
        multiple
        options={adminOptions}
        disableCloseOnSelect
        getOptionLabel={option => option}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option}
          </li>
        )}
        style={{ width: fieldWidth }}
        renderInput={params => <TextField {...params} label="User Roles" />}
      />
      <Button>
        <Typography variant="h5" color="white" padding={1}>
          Create User
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
      <Box
        width={500}
        height={500}
        display="flex"
        flexDirection={'row-reverse'}
      >
        <CloseIcon onClick={closeDialog} />
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
        sx={{
          borderRadius: 100,
          boxShadow: 6,
        }}
        onClick={openDialog}
      >
        <Typography variant="body2" padding={1} textTransform="none">
          <FormattedMessage id="admin.add_user" defaultMessage="Add User" />
        </Typography>
        <AddIcon fontSize="medium" />
      </Button>
      <UserCreateDialog open={dialogOpen} closeDialog={closeDialog} />
    </Box>
  );
};
