import React from 'react';
import { useSelector } from 'react-redux';
import Product from './Product';
import { Grid } from '@mui/material';

export default function FetchedProducts() {
  const { products } = useSelector((state) => state.products);
  if (products) {
    return (
      <Grid container spacing={2}>
          {products.map((product) => (
            <Grid key={product.id} item xs={6} sm={3}>
              <Product product={product} />
            </Grid>
          ))}
      </Grid>
    );
  }
  return <p className='text-center'>No products</p>;
}
