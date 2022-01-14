import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, DialogContent, Alert, Snackbar } from '@mui/material';
import { dialog } from '../../redux-store/slices/dialogSlice';
import DialogBrand from './dialogContent/DialogBrand';
import DialogColor from './dialogContent/DialogColor';
import DialogType from './dialogContent/DialogType';
import DialogProduct from './dialogContent/DialogProduct';

const Dialogs = () => {
  const [open, setOpen] = useState(false);
  const [noti, setNoti] = useState({ type: '', message: '' });
  const dialogVisible = useSelector((state) => state.dialog.dialogShow);
  const dialogName = useSelector((state) => state.dialog.dialogName);
  const dispatch = useDispatch();

  const dialogList = {
    type: DialogType,
    brand: DialogBrand,
    product: DialogProduct,
    color: DialogColor,
  };

  const DialogShow = dialogList[dialogName];

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const hideDialog = (noti) => {
    dispatch(
      dialog({
        visible: false,
        name: dialogName,
      })
    );
    if (noti?.message) {
      setNoti({
        type: noti.type,
        message: noti.message
      })
      setOpen(true);
    }
  };

  return (
    <React.Fragment>
      <Dialog open={dialogVisible} onClose={hideDialog} maxWidth={'md'}>
        <DialogContent>{dialogName ? <DialogShow hideDialog={hideDialog} /> : ''}</DialogContent>
      </Dialog>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={noti.type || 'info'} sx={{ width: '100%' }}>
          {noti.message}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
};

export default Dialogs;
