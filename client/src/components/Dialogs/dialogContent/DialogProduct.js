import React from 'react';
import { TextField, Button, DialogActions, FormControl, InputLabel, Select } from '@mui/material';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { productsActions } from '../../../redux-store/saga/sagaActions';
import ImageUpload from '../../ImageUpload/ImageUpload';

import * as yup from 'yup';

const validationSchema = yup.object({
  name: yup.string('Enter name').required('Required'),
  desc: yup.string('Enter description').required('Required'),
  price: yup.string('Enter price').required('Required'),
  typeId: yup.string('Enter type').required('Required'),
  brandId: yup.string('Enter brand').required('Required'),
  colorId: yup.string('Enter color').required('Required'),
});

const DialogProduct = ({ hideDialog, showNoti, readyData }) => {
  const dispatch = useDispatch();
  const { brands, colors, types } = useSelector((state) => state.categories);
  const product = readyData || null;

  const formik = useFormik({
    initialValues: {
      name: product?.name || '',
      desc: product?.desc || '',
      price: product?.price || '',
      typeId: product?.typeId || '',
      brandId: product?.brandId || '',
      colorId: product?.colorId || '',
      images: product?.images || [],
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      if (product) {
        values.id = product.id;
        dispatch({ type: productsActions.EDIT_PRODUCT, product: values });
        hideDialog();
        showNoti({ type: 'success', message: 'Product changed successfully!' });
        resetForm();
        return;
      }
      dispatch({ type: productsActions.ADD_PRODUCT, product: values });
      showNoti({ type: 'success', message: 'Product added successfully!' });
      resetForm();
    },
  });

  const images = (val) => {
    formik.values.images = val
  }

  return (
    <div>
      <p>{product ? 'Change product': 'Add product'}</p>
      <form onSubmit={formik.handleSubmit}>
        <FormControl variant='standard' fullWidth style={{ marginBottom: '20px' }}>
          <InputLabel>Type</InputLabel>
          <Select native name='typeId' value={formik.values.typeId} label='Тип' onChange={formik.handleChange} error={formik.touched.typeId && Boolean(formik.errors.typeId)}>
            <option value=''></option>
            {types.map((elem) => (
              <option key={elem.id} value={elem.id}>
                {elem.name}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl variant='standard' fullWidth style={{ marginBottom: '20px' }}>
          <InputLabel>Brand</InputLabel>
          <Select native name='brandId' value={formik.values.brandId} label='Brand' onChange={formik.handleChange} error={formik.touched.brandId && Boolean(formik.errors.brandId)}>
            <option value=''></option>
            {brands.map((elem) => (
              <option key={elem.id} value={elem.id}>
                {elem.name}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl variant='standard' fullWidth style={{ marginBottom: '20px' }}>
          <InputLabel>Color</InputLabel>
          <Select native name='colorId' value={formik.values.colorId} label='Color' onChange={formik.handleChange} error={formik.touched.colorId && Boolean(formik.errors.colorId)}>
            <option value=''></option>
            {colors.map((elem) => (
              <option key={elem.id} value={elem.id}>
                {elem.name}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl variant='standard' fullWidth style={{ marginBottom: '20px' }}>
          <InputLabel>Image</InputLabel>
          <ImageUpload images={images} editImages={product?.images}/>
        </FormControl>
        <TextField label='Name' variant='standard' value={formik.values.name} type='text' name='name' onChange={formik.handleChange} error={formik.touched.name && Boolean(formik.errors.name)} helperText={formik.touched.name && formik.errors.name} fullWidth style={{ marginBottom: '20px' }} />
        <TextField label='Description' variant='standard' value={formik.values.desc} type='text' name='desc' onChange={formik.handleChange} error={formik.touched.desc && Boolean(formik.errors.desc)} helperText={formik.touched.desc && formik.errors.desc} fullWidth style={{ marginBottom: '20px' }} />
        <TextField label='Price' variant='standard' value={formik.values.price} type='text' name='price' onChange={formik.handleChange} error={formik.touched.price && Boolean(formik.errors.price)} helperText={formik.touched.price && formik.errors.price} fullWidth style={{ marginBottom: '20px' }} />
        <DialogActions style={{ marginTop: '20px' }}>
          <Button onClick={() => hideDialog()}>Close</Button>
          {product ? (
            <Button variant='contained' type='submit'>
              Change product
            </Button>
          ) : (
            <Button variant='contained' type='submit'>
              Add product
            </Button>
          )}
        </DialogActions>
      </form>
    </div>
  );
};

export default DialogProduct;
