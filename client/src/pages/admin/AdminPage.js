import React, { useState, useEffect } from 'react';
import { Button, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { dialog } from '../../redux-store/slices/dialogSlice';
import Dialogs from '../../components/Dialogs';
import InfoTable from '../../components/InfoTable/InfoTable';
import { productsActions, categoriesActions } from '../../redux-store/saga/sagaActions';

const AdminPage = () => {
  const dispatch = useDispatch();
  const [editProduct, setEditProduct] = useState([]);
  const { products, page } = useSelector((state) => state.products);
  const headers = ['Products', 'Noun', 'Description', 'Price', 'Image', 'Type', 'Brand', 'Color', 'Action'];

  useEffect(() => {
    dispatch({ type: categoriesActions.GET_ALL_CAT });
  }, [dispatch]);
  useEffect(() => {
    dispatch({ type: productsActions.GET_ALL_PRODUCTS });
  }, [dispatch, page]);

  const openDialog = (name) => {
    dispatch(
      dialog({
        visible: true,
        name,
      })
    );
  };

  const removeElem = (id) => {
    dispatch({ type: productsActions.REMOVE_PRODUCT, val: id });
  };

  const editElem = (id) => {
    setEditProduct(products.filter((elem) => elem.id === id));
    openDialog('product');
  };

  return (
    <React.Fragment>
      <h3>Admin page</h3>
      <Grid>
        <Grid container spacing={2}>
          <Grid item xs={3} md={1}>
            <Button variant='contained' onClick={() => openDialog('type')} style={{ width: '100%' }}>
              Type
            </Button>
          </Grid>
          <Grid item xs={3} md={1}>
            <Button variant='contained' onClick={() => openDialog('brand')} style={{ width: '100%' }}>
              Brand
            </Button>
          </Grid>
          <Grid item xs={3} md={1}>
            <Button variant='contained' onClick={() => openDialog('color')} style={{ width: '100%' }}>
              Color
            </Button>
          </Grid>
          <Grid item xs={3} md={1}>
            <Button
              variant='contained'
              onClick={() => {
                openDialog('product');
                setEditProduct([]);
              }}
              style={{ width: '100%' }}>
              Product
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <InfoTable headers={headers} body={products} removeElem={removeElem} editElem={editElem} />
      <Dialogs readyData={editProduct[0] || null} />
    </React.Fragment>
  );
};

export default AdminPage;
