import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Dialog, DialogContent} from '@mui/material'
import { dialog } from '../../redux-store/slices/dialogSlice';
import DialogBrand from './dialogContent/DialogBrand';
import DialogColor from './dialogContent/DialogColor';
import DialogType from './dialogContent/DialogType';
import DialogProduct from './dialogContent/DialogProduct';

const Dialogs = () => {
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

  const hideDialog = () => {
    dispatch(
      dialog({
        visible: false,
        name: dialogName,
      })
    );
  };

  return (
    <Dialog open={dialogVisible} onClose={hideDialog} maxWidth={'md'}>
      <DialogContent>{dialogName ? <DialogShow hideDialog={hideDialog} /> : ''}</DialogContent>
    </Dialog>
  );
};

export default Dialogs;
