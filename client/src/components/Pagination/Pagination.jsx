import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Pagination as Nav } from '@mui/material';
import { setPage } from '../../redux-store/slices/productSlice';

const Pagination = () => {
  const {totalCount, limit} = useSelector((state) => state.products);
  const pageCount = Math.ceil(totalCount / limit);
  const dispatch = useDispatch();

  const onChange = (e, val) => {
    dispatch(setPage(val));
  };

  return pageCount > 1 ? <Nav onChange={onChange} count={pageCount} variant="outlined" color="primary" /> : '';
};

export default Pagination;
