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
  Tooltip,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { usePatchFloodNumber } from 'services/api/kobo/usePatchForm';

type FloodForm = {
  id: string;
  province: string;
};

export const BatchEditWarningTooltip = () => (
  <Tooltip
    title={
      <Typography color="#D32C38">
        <FormattedMessage id="forms_table.batch_edit.warning" />
      </Typography>
    }
    open={true}
    placement="top"
    arrow
    componentsProps={{
      tooltip: {
        sx: {
          backgroundColor: 'white',
          maxWidth: 'none',
          border: '1px solid #D32C38',
        },
      },
      arrow: {
        sx: {
          color: 'white',
          '&:before': {
            border: '1px solid #D32C38',
          },
        },
      },
    }}
  >
    <div style={{ width: '100%' }} />
  </Tooltip>
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
      maxWidth="xs"
      open={dialogOpen}
      onClose={() => setDialogOpen(false)}
      disableScrollLock
      disableEnforceFocus
      slotProps={{ backdrop: { style: { display: 'none' } } }}
      sx={{
        position: 'fixed',
        top: (lastCheckboxPosition?.top ?? 0) - 500,
        left: lastCheckboxPosition?.left,
      }}
      PaperProps={{
        sx: { borderRadius: '8px', border: '1px solid #ccc' },
      }}
    >
      <DialogTitle>
        <FormattedMessage
          id="forms_table.batch_edit.dialog_title"
          values={{ count: selectedForms.length }}
        />
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2} justifyContent="space-between">
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent="space-between"
          >
            <FormattedMessage id="forms_table.batch_edit.forms_selected" />
            <Typography component="span" variant="h5" sx={{ m: 1 }}>
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
        <IconButton
          onClick={() => setDialogOpen(false)}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: 'black',
          }}
        >
          <CancelIcon />
        </IconButton>
        <Button
          onClick={handleSave}
          disabled={newFloodNumber === null || isMutating}
          variant="contained"
          sx={{
            mr: 1,
            mb: 1,
            backgroundColor: 'var(--color_buttons_1)',
            color: 'black',
            width: '100%',
          }}
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
