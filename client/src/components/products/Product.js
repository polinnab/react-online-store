import React from 'react';
import { NavLink } from 'react-router-dom';
import { product_route } from '../../shared/utils/_constans';

export default function Product({ product }) {
  return (
    <div className='card' style={{ width: '100%' }}>
      {<img src={'http://localhost:5001/upload/' + product.images[0].thumbnail} className='card-img-top' alt={product.name} />}
      <div className='card-body'>
        <h5 className='card-title'>{product.name}</h5>
        <p className='card-text'>{product.price} rub</p>
        <NavLink to={product_route + '/' + product.id} className='btn btn-primary'>
          Buy
        </NavLink>
      </div>
    </div>
  );
}
