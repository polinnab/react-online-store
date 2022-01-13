import React from 'react';
import { Button, Grid } from '@mui/material';
import { useDispatch } from 'react-redux';
import { dialog } from '../../redux-store/slices/dialogSlice';
import Dialogs from '../../components/Dialogs';

const AdminPage = () => {
  const dispatch = useDispatch();

  const openDialog = (name) => {
    dispatch(
      dialog({
        visible: true,
        name,
      })
    );
  };

  return (
    <React.Fragment>
      <h3>Admin page</h3>
      <Grid>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Button variant='contained' onClick={() => openDialog('type')}>Добавить тип</Button>
          </Grid>
          <Grid item xs={8}>
            <Button variant='contained' onClick={() => openDialog('brand')}>Добавить бренд</Button>
          </Grid>
          <Grid item xs={8}>
            <Button variant='contained' onClick={() => openDialog('color')}>Добавить цвет</Button>
          </Grid>
          <Grid item xs={8}>
            <Button variant='contained' onClick={() => openDialog('product')}>Добавить товар</Button>
          </Grid>
        </Grid>
      </Grid>
      <Dialogs/>
    </React.Fragment>
  );
};

export default AdminPage;
