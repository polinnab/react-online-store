import React from 'react';
import { TextField, Button, DialogActions, FormControl, InputLabel, Select } from '@mui/material';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { productsActions } from '../../../redux-store/saga/sagaActions';
import ImageUpload from '../../ImageUpload/ImageUpload';

import * as yup from 'yup';

const validationSchema = yup.object({
  name: yup.string('Введите название').required('Поле обязательно'),
  desc: yup.string('Введите описание').required('Поле обязательно'),
  price: yup.string('Введите цену').required('Поле обязательно'),
  typeId: yup.string('Выберите тип').required('Поле обязательно'),
  brandId: yup.string('Выберите бренд').required('Поле обязательно'),
  colorId: yup.string('Выберите цвет').required('Поле обязательно'),
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
        showNoti({ type: 'success', message: 'Товар успешно изменен!' });
        resetForm();
        return;
      }
      dispatch({ type: productsActions.ADD_PRODUCT, product: values });
      showNoti({ type: 'success', message: 'Товар успешно добавлен!' });
      resetForm();
    },
  });

  const images = (val) => {
    formik.values.images = val
  }

  return (
    <div>
      <p>{product ? 'Изменить товар': 'Добавить товар'}</p>
      <form onSubmit={formik.handleSubmit}>
        <FormControl variant='standard' fullWidth style={{ marginBottom: '20px' }}>
          <InputLabel>Тип</InputLabel>
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
          <InputLabel>Бренд</InputLabel>
          <Select native name='brandId' value={formik.values.brandId} label='Бренд' onChange={formik.handleChange} error={formik.touched.brandId && Boolean(formik.errors.brandId)}>
            <option value=''></option>
            {brands.map((elem) => (
              <option key={elem.id} value={elem.id}>
                {elem.name}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl variant='standard' fullWidth style={{ marginBottom: '20px' }}>
          <InputLabel>Цвет</InputLabel>
          <Select native name='colorId' value={formik.values.colorId} label='Цвет' onChange={formik.handleChange} error={formik.touched.colorId && Boolean(formik.errors.colorId)}>
            <option value=''></option>
            {colors.map((elem) => (
              <option key={elem.id} value={elem.id}>
                {elem.name}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl variant='standard' fullWidth style={{ marginBottom: '20px' }}>
          <InputLabel>Картинка</InputLabel>
          {/* {product?.images ? (<div>
            {product.images.map((elem, idx) => <img key={idx} src={IMAGE_URL + elem.thumbnail} alt={elem.thumbnail}/>)}
            
          </div>): null} */}
          
          <ImageUpload images={images} editImages={product?.images}/>
        </FormControl>
        <TextField label='Название' variant='standard' value={formik.values.name} type='text' name='name' onChange={formik.handleChange} error={formik.touched.name && Boolean(formik.errors.name)} helperText={formik.touched.name && formik.errors.name} fullWidth style={{ marginBottom: '20px' }} />
        <TextField label='Описание' variant='standard' value={formik.values.desc} type='text' name='desc' onChange={formik.handleChange} error={formik.touched.desc && Boolean(formik.errors.desc)} helperText={formik.touched.desc && formik.errors.desc} fullWidth style={{ marginBottom: '20px' }} />
        <TextField label='Цена' variant='standard' value={formik.values.price} type='text' name='price' onChange={formik.handleChange} error={formik.touched.price && Boolean(formik.errors.price)} helperText={formik.touched.price && formik.errors.price} fullWidth style={{ marginBottom: '20px' }} />
        <DialogActions style={{ marginTop: '20px' }}>
          <Button onClick={() => hideDialog()}>Закрыть</Button>
          {product ? (
            <Button variant='contained' type='submit'>
              Изменить товар
            </Button>
          ) : (
            <Button variant='contained' type='submit'>
              Добавить товар
            </Button>
          )}
        </DialogActions>
      </form>
    </div>
  );
};

export default DialogProduct;
