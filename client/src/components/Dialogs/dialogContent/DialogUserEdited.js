import React from 'react';
import { Button, DialogActions } from '@mui/material';


const DialogUserEdited = ({ hideDialog, showNoti }) => {

  return (
    <div>
      <p style={{textAlign: 'center'}}>User info has been edited successfully!</p>
        <DialogActions style={{ marginTop: '20px', justifyContent: 'center' }}>
          <Button onClick={() => hideDialog()}>OK</Button>
        </DialogActions>
    </div>
  );
};

export default DialogUserEdited;
