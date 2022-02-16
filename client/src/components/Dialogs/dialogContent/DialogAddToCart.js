import React from 'react';
import { Button, DialogActions } from '@mui/material';
import { userCart_route } from "../../../shared/utils/_constans";
import { NavLink } from 'react-router-dom';


const DialogAddToCart = ({ hideDialog, showNoti }) => {

  return (
    <div>
      <p style={{textAlign: 'center'}}>Товар успешно добавлен в корзину!</p>
        <DialogActions style={{ marginTop: '20px' }}>
          <Button onClick={() => hideDialog()}>Продолжить покупки</Button>
          <NavLink to={userCart_route}>
            <Button onClick={() => hideDialog()}>Перейти в корзину</Button>
          </NavLink>
        </DialogActions>
    </div>
  );
};

export default DialogAddToCart;
