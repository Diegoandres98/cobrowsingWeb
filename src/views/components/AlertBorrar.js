import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// eslint-disable-next-line react/prop-types
export default function AlertDialogSlide({ openModal = false, setOpenModal, handleAcept }) {
  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={openModal.status}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{'Quieres cambiar el estado de este item?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {openModal.statusItemSelected
              ? 'Estas, seguro que deseas borrar este item?, ten en cuenta que nada sera borrado, y solo pasara a un estado inactivo'
              : 'Estas seguro que deseas activar este item? podra operar como antes!!'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Descarto</Button>
          <Button onClick={handleAcept}>Acepto</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
