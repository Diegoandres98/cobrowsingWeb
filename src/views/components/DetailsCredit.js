import * as React from 'react';
import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import AnimateButton from 'ui-component/extended/AnimateButton';
// eslint-disable-next-line react/prop-types
export default function FormDialog({ children, open, setOpen }) {
  //   const [open, setOpen] = React.useState(false);

  //   const handleClickOpen = () => {
  //     setOpen(true);
  //   };

  const handleClose = () => {
    setOpen({
      ...open,
      status: false
    });
  };

  return (
    <React.Fragment>
      <Dialog open={open.status} onClose={handleClose}>
        <DialogTitle>Detalles</DialogTitle>
        <DialogContent>
          {children}
          {/* <TextField autoFocus margin="dense" id="name" label="Email Address" type="email" fullWidth variant="standard" /> */}
        </DialogContent>
        <DialogActions>
          <AnimateButton>
            <Button onClick={handleClose} fullWidth size="large" type="submit" variant="contained" color="secondary">
              Cerrar!!
            </Button>
          </AnimateButton>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
