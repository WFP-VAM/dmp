import CancelIcon from '@mui/icons-material/Cancel';
import CheckIcon from '@mui/icons-material/Check';
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
import { useState } from 'react';
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

  const handleSave = async () => {
    if (newFloodNumber !== null && !isMutating) {
      await triggerPatch(); // Updated call
      handleEditFloodNumber(newFloodNumber);
      setDialogOpen(false);
    }
  };

  const renderButtons = () => (
    <>
      <Tooltip
        title={
          batchEditMode ? (
            <FormattedMessage id="forms_table.batch_edit.cancel" />
          ) : (
            <FormattedMessage id="forms_table.batch_edit.start" />
          )
        }
      >
        <IconButton
          onClick={handleBatchEditClick}
          sx={{
            marginRight: batchEditMode ? -1 : -3,
            marginLeft: -0.5,
            color: batchEditMode ? '#D32C38' : 'var(--color_buttons_1)',
            '&:hover': {
              backgroundColor: 'transparent',
            },
          }}
        >
          {batchEditMode ? <CancelIcon /> : <EditIcon />}
        </IconButton>
      </Tooltip>

      {batchEditMode && (
        <Tooltip
          title={<FormattedMessage id="forms_table.batch_edit.open_dialog" />}
        >
          <IconButton
            disabled={selectedForms.length === 0}
            onClick={() => setDialogOpen(true)}
            sx={{
              marginRight: -3,
              color: 'green',
              '&:hover': {
                backgroundColor: 'transparent',
              },
            }}
          >
            <CheckIcon />
          </IconButton>
        </Tooltip>
      )}
    </>
  );

  const renderEditButton = () => (
    <Button
      onClick={() => setDialogOpen(true)}
      sx={{
        opacity: 1,
        position: 'fixed',
        top: lastCheckboxPosition?.top,
        left: lastCheckboxPosition?.left,
        transform: 'translateX(10px)',
        '&:hover': {
          backgroundColor: 'var(--color_table_1)',
        },
        color: 'black',
        backgroundColor: 'var(--color_buttons_1)',
      }}
    >
      <FormattedMessage
        id="forms_table.batch_edit.edit_forms"
        values={{ count: selectedForms.length }}
      />
    </Button>
  );

  const renderDialog = () => (
    <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
      <DialogTitle>
        <FormattedMessage
          id="forms_table.batch_edit.dialog_title"
          values={{ count: selectedForms.length }}
        />
      </DialogTitle>
      <DialogContent>
        <TextField
          type="number"
          label={
            <FormattedMessage id="forms_table.batch_edit.new_flood_number" />
          }
          InputLabelProps={{
            shrink: true,
          }}
          sx={{
            margin: '1rem',
            width: '80%',
          }}
          value={newFloodNumber}
          onChange={e => setNewFloodNumber(Number(e.target.value))}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setDialogOpen(false)}>
          <FormattedMessage id="forms_table.batch_edit.cancel" />
        </Button>
        <Button
          onClick={handleSave}
          disabled={newFloodNumber === null || isMutating}
        >
          <FormattedMessage id="forms_table.batch_edit.save" />
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <>
      {renderButtons()}
      {batchEditMode &&
        selectedForms.length > 0 &&
        lastCheckboxPosition &&
        renderEditButton()}
      {renderDialog()}
    </>
  );
};

export default BatchEditDialog;
