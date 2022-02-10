import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Product from './Product';
import { Grid } from '@mui/material';
import { setTotalCount } from '../../redux-store/slices/productSlice';
import { productsActions } from '../../redux-store/saga/sagaActions';
import Pagination from '../Pagination/Pagination';

export default function FetchedProducts() {
  const dispatch = useDispatch();
  const { products, page } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(setTotalCount(products.length));
  }, [dispatch, products]);

  useEffect(() => {
    
    dispatch({ type: productsActions.GET_ALL_PRODUCTS, page, limit: 1 });
  }, []);
  if (products) {
    return (
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid key={product.id} item xs={6} sm={4}>
            <Product product={product} />
          </Grid>
        ))}
        <Pagination />
      </Grid>
    );
  }
  return <p className='text-center'>No products</p>;
}
