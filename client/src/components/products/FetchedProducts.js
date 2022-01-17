import React from 'react';
import { useSelector } from 'react-redux';
import Product from './Product';

export default function FetchedProducts() {
  const { products } = useSelector((state) => state.products);
  console.log('fetchedproducts: ', products);

  if (products) {
    return (
      <div>
        {products.map((product) => (
          <Product product={product} key={product.id} />
        ))}
      </div>
    );
  }
  return <p className='text-center'>No products</p>;
}
