import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, DialogContent, Alert, Snackbar } from '@mui/material';
import { dialog } from '../../redux-store/slices/dialogSlice';
import DialogBrand from './dialogContent/DialogBrand';
import DialogColor from './dialogContent/DialogColor';
import DialogType from './dialogContent/DialogType';
import DialogProduct from './dialogContent/DialogProduct';
import DialogAddToCart from './dialogContent/DialogAddToCart';
import DialogOrder from './dialogContent/DialogOrder';
import DialogUserEdited from './dialogContent/DialogUserEdited';

const Dialogs = ({readyData}) => {
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
    addToCart: DialogAddToCart,
    order: DialogOrder,
    userEdited: DialogUserEdited 
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
        name: dialogName
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

  const showNoti = (noti) => {
    if (noti?.message) {
      setNoti({
        type: noti.type,
        message: noti.message
      })
      setOpen(true);
    }
  }

  return (
    <React.Fragment>
      <Dialog open={dialogVisible} onClose={hideDialog} maxWidth={'md'}>
        <DialogContent>{dialogName ? <DialogShow hideDialog={hideDialog} showNoti={showNoti} readyData={readyData} /> : ''}</DialogContent>
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
