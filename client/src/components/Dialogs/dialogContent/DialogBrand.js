import React, { useEffect } from 'react';
import { TextField, Button, DialogActions } from '@mui/material';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { categoriesActions } from '../../../redux-store/saga/sagaActions';
import InfoTable from '../../InfoTable/InfoTable';
import * as yup from 'yup';

const validationSchema = yup.object({
  brand: yup.string('Choose brand').required('Requierd'),
});

const DialogBrand = ({ hideDialog, showNoti }) => {
  const dispatch = useDispatch();
  const brands = useSelector((state) => state.categories.brands);
  const headers = ['Brands', 'Noun', 'Action'];

  useEffect(() => {
    dispatch({ type: categoriesActions.GET_CAT, category_name: 'brands' });
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      brand: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, {resetForm}) => {
      dispatch({ type: categoriesActions.ADD_CAT, category_name: 'brands', val: values.brand });
      showNoti({ type: 'success', message: 'Brand added successfully!' });
      resetForm();
    },
  });

  const removeElem = (id) => {
    dispatch({ type: categoriesActions.REMOVE_CAT, category_name: 'brands', val: id });
  };

  return (
    <div>
      <InfoTable headers={headers} body={brands} removeElem={removeElem} />
      <p>Add brand</p>
      <form onSubmit={formik.handleSubmit}>
        <TextField label='Brand' variant='standard' value={formik.values.brand} type='text' name='brand' onChange={formik.handleChange} error={formik.touched.brand && Boolean(formik.errors.brand)} helperText={formik.touched.brand && formik.errors.brand} fullWidth />
        <DialogActions style={{ marginTop: '20px' }}>
          <Button onClick={() => hideDialog()}>Close</Button>
          <Button variant='contained' type='submit'>
            Add brand
          </Button>
        </DialogActions>
      </form>
    </div>
  );
};

export default DialogBrand;
