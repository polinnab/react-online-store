import React from 'react';
import { Button, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { dialog } from '../../redux-store/slices/dialogSlice';
import Dialogs from '../../components/Dialogs';
import InfoTable from '../../components/InfoTable/InfoTable';

import { productsActions } from '../../redux-store/saga/sagaActions';

const AdminPage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const headers = ['Товары', 'Название', 'Описание', 'Цена', 'Изображение', 'Тип', 'Бренд', 'Цвет', 'Действие'];

  const openDialog = (name, data) => {
    dispatch(
      dialog({
        visible: true,
        name,
        data,
      })
    );
  };

  const removeElem = (id) => {
    dispatch({ type: productsActions.REMOVE_PRODUCT, val: id });
  };

  const editElem = (id) => {
    openDialog('product', { type: 'product', id });
    //dispatch({ type: productsActions.EDIT_PRODUCT, val: id });
  };

  return (
    <React.Fragment>
      <h3>Admin page</h3>
      <Grid>
        <Grid container spacing={2}>
          <Grid item xs={3} md={1}>
            <Button variant='contained' onClick={() => openDialog('type')} style={{ width: '100%' }}>
              Тип
            </Button>
          </Grid>
          <Grid item xs={3} md={1}>
            <Button variant='contained' onClick={() => openDialog('brand')} style={{ width: '100%' }}>
              Бренд
            </Button>
          </Grid>
          <Grid item xs={3} md={1}>
            <Button variant='contained' onClick={() => openDialog('color')} style={{ width: '100%' }}>
              Цвет
            </Button>
          </Grid>
          <Grid item xs={3} md={1}>
            <Button variant='contained' onClick={() => openDialog('product')} style={{ width: '100%' }}>
              Товар
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <InfoTable headers={headers} body={products} removeElem={removeElem} editElem={editElem} />
      <Dialogs />
    </React.Fragment>
  );
};

export default AdminPage;
