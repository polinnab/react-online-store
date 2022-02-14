import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import Product from './Product';
import { Grid } from '@mui/material';
import { productsActions } from '../../redux-store/saga/sagaActions';
import Pagination from '../Pagination/Pagination';

export default function FetchedProducts() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, page, limit } = useSelector((state) => state.products);
  const filterQuery = new URLSearchParams(searchParams).toString();

  useEffect(() => {
    if (!filterQuery.length) {
      dispatch({ type: productsActions.GET_ALL_PRODUCTS, page, limit });
    }
  }, [dispatch, page, limit]);
  if (products) {
    return (
      <React.Fragment>
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid key={product.id} item xs={6} sm={4}>
              <Product product={product} />
            </Grid>
          ))}
        </Grid>
        <br />
        <br />
        <Pagination />
      </React.Fragment>
    );
  }
  return <p className='text-center'>No products</p>;
}
