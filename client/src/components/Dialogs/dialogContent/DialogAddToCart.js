import React from 'react';
import { Button, DialogActions } from '@mui/material';
import { cart_route } from "../../../shared/utils/_constans";
import { NavLink } from 'react-router-dom';


const DialogAddToCart = ({ hideDialog, showNoti }) => {

  return (
    <div>
      <p style={{textAlign: 'center'}}>Product has been added to cart successfully!</p>
        <DialogActions style={{ marginTop: '20px' }}>
          <Button onClick={() => hideDialog()}>Continue shopping</Button>
          <NavLink to={cart_route}>
            <Button onClick={() => hideDialog()}>Go to cart</Button>
          </NavLink>
        </DialogActions>
    </div>
  );
};

export default DialogAddToCart;
