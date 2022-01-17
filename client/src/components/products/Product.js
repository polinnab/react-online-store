import React from 'react';
import { NavLink } from 'react-router-dom';
import { basket_route } from '../../shared/utils/_constans';

export default function Product({ product }) {
  console.log('product', product);
  return (
    <div className='card' style={{ width: '18rem' }}>
      <img src={'http://localhost:5001' + product.images[0].thumb} className='card-img-top' alt={product.name} />
      <div className='card-body'>
        <h5 className='card-title'>{product.name}</h5>
        <p className='card-text'>{product.price}</p>
        <NavLink to={basket_route} className='btn btn-primary'>
          Buy
        </NavLink>
      </div>
    </div>
  );
}

// images have not relative src !
