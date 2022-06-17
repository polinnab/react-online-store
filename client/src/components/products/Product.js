import React from 'react';
import { NavLink } from 'react-router-dom';
import { product_route } from '../../shared/utils/_constans';
import { IMAGE_URL } from '../../shared/utils/_constans';
import { moneyFormatter } from '../../shared/utils/_methods';
import { useTranslation } from "react-i18next";

export default function Product({ product }) {
  const { t } = useTranslation()
  return (
    <div className='card' style={{ width: '100%' }}>
      {<img src={IMAGE_URL + product.images[0].thumbnail} className='card-img-top' alt={product.name} />}
      <div className='card-body'>
        <h5 className='card-title'>{product.name}</h5>
        <p className='card-text'>${moneyFormatter(product.price)}</p>
        <NavLink to={product_route + '/' + product.id} className='btn btn-primary'>
          {t('buy')}
        </NavLink>
      </div>
    </div>
  );
}
