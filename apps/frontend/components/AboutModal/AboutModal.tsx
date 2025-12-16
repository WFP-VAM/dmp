import InfoIcon from '@mui/icons-material/Info';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Fab,
  IconButton,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';

export const AboutModal = (): JSX.Element => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Fab
        color="primary"
        aria-label="about"
        onClick={handleOpen}
        sx={{
          position: 'fixed',
          bottom: 16,
          left: 16,
          zIndex: 1000,
        }}
      >
        <InfoIcon />
      </Fab>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        aria-labelledby="about-dialog-title"
      >
        <DialogTitle id="about-dialog-title">
          <Typography variant="h5" component="div">
            <FormattedMessage id="about.title" />
          </Typography>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Typography paragraph>
            <FormattedMessage id="about.content_paragraph_1" />
          </Typography>
          <Typography paragraph>
            <FormattedMessage id="about.content_paragraph_2" />
          </Typography>
          <Typography paragraph>
            <FormattedMessage id="about.content_paragraph_3" />
          </Typography>
        </DialogContent>
      </Dialog>
    </>
  );
};
