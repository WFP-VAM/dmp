import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { usePatchFloodNumber } from 'services/api/kobo/usePatchForm';

type FloodForm = {
  id: string;
  province: string;
};

export const BatchEditWarning = () => (
  <Stack
    direction="row"
    spacing={2}
    m={2}
    mb={0}
    justifyContent="center"
    alignItems="center"
  >
    <Typography color="#D32C38">
      <FormattedMessage id="forms_table.batch_edit.warning" />
    </Typography>
  </Stack>
);

export const BatchEditDialog = ({
  batchEditMode,
  selectedForms,
  handleBatchEditClick,
  handleEditFloodNumber,
  lastCheckboxPosition,
}: {
  batchEditMode: boolean;
  selectedForms: FloodForm[];
  handleBatchEditClick: () => void;
  handleEditFloodNumber: (newFloodNumber: number) => void;
  lastCheckboxPosition: { top: number; left: number } | null;
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newFloodNumber, setNewFloodNumber] = useState<number | null>(null);

  const formIds = selectedForms.map(form => form.id);
  const { trigger: triggerPatch, isMutating } = usePatchFloodNumber(
    formIds,
    newFloodNumber ?? 0,
  );

  useEffect(() => {
    if (batchEditMode && selectedForms.length > 0) {
      setDialogOpen(true);
    } else {
      setDialogOpen(false);
    }
  }, [batchEditMode, selectedForms]);

  const handleSave = async () => {
    if (newFloodNumber !== null && !isMutating) {
      await triggerPatch(); // Updated call
      handleEditFloodNumber(newFloodNumber);
      setDialogOpen(false);
    }
  };

  const renderButtons = () => (
    <IconButton
      onClick={handleBatchEditClick}
      sx={{
        fontSize: '14px',
        marginRight: batchEditMode ? -1 : -3,
        marginLeft: -1,
        marginBottom: -2,
        color: batchEditMode ? '#D32C38' : 'black',
        '&:hover': {
          backgroundColor: 'transparent',
        },
      }}
    >
      {batchEditMode ? (
        <CancelIcon sx={{ pr: 1 }} fontSize="medium" />
      ) : (
        <EditIcon sx={{ pr: 1 }} fontSize="medium" />
      )}
      <FormattedMessage
        id={
          batchEditMode
            ? 'forms_table.batch_edit.cancel'
            : 'forms_table.batch_edit.edit'
        }
      />
    </IconButton>
  );

  const renderDialog = () => (
    <Dialog
      open={dialogOpen}
      onClose={() => setDialogOpen(false)}
      disableScrollLock
      slotProps={{ backdrop: { style: { display: 'none' } } }}
      sx={{
        position: 'fixed',
        top: lastCheckboxPosition?.top,
        left: lastCheckboxPosition?.left,
      }}
    >
      <DialogTitle>
        <FormattedMessage
          id="forms_table.batch_edit.dialog_title"
          values={{ count: selectedForms.length }}
        />
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2} m={0} justifyContent="space-between">
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent="space-between"
          >
            <FormattedMessage id="forms_table.batch_edit.forms_selected" />
            <Typography component="span" variant="h5" sx={{ ml: 1 }}>
              {selectedForms.length}
            </Typography>
          </Stack>
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent="space-between"
          >
            <FormattedMessage id="forms_table.batch_edit.new_flood_number" />
            <TextField
              type="number"
              label=""
              sx={{
                width: '30%',
              }}
              value={newFloodNumber}
              onChange={e => setNewFloodNumber(Number(e.target.value))}
              fullWidth
            />
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setDialogOpen(false)}>
          <FormattedMessage id="forms_table.batch_edit.cancel" />
        </Button>
        <Button
          onClick={handleSave}
          disabled={newFloodNumber === null || isMutating}
          variant="contained"
          sx={{ backgroundColor: 'var(--color_buttons_1)', color: 'black' }}
        >
          <FormattedMessage id="forms_table.batch_edit.save" />
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <>
      {renderButtons()}
      {renderDialog()}
    </>
  );
};

export default BatchEditDialog;