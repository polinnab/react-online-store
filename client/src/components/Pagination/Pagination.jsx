import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Pagination as Nav } from '@mui/material';
import { setPage } from '../../redux-store/slices/productSlice';

const Pagination = () => {
  const product = useSelector((state) => state.products);
  const pageCount = Math.ceil(product.totalCount / product.limit);
  const dispatch = useDispatch();

  const onChange = (e) => {
		console.log('e', e.target.innerText);
    dispatch(setPage(e));
  };

  return pageCount > 1 ? <Nav onChange={onChange} count={pageCount} variant="outlined" color="primary" /> : '';
};

export default Pagination;
