import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography } from '@mui/material';

function NoteDialog(props: any) {
  function handleClose() {
    props.onClose();
  }
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        scroll={props.scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle
          suppressContentEditableWarning={true}
          contentEditable={true}
          sx={{ outline: '0 solid transparent' }}
          spellCheck={false}
          id="scroll-dialog-title"
        >
          {props.note.title}
        </DialogTitle>
        <DialogContent dividers={props.scroll === 'paper'}>
          <Typography
            gutterBottom
            suppressContentEditableWarning={true}
            contentEditable={true}
            variant="body1"
            spellCheck={false}
            sx={{ outline: '0 solid transparent' }}
          >
            {props.note.content}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleClose}>
            Archive
          </Button>
          <Button color="secondary" onClick={handleClose}>
            Delete
          </Button>
          <Button color="secondary" onClick={handleClose}>
            Discard
          </Button>
          <Button color="secondary" onClick={handleClose}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default NoteDialog;
