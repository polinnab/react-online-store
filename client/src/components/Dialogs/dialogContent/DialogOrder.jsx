import React from 'react';
import { TextField, Button, DialogActions, FormControl, InputLabel, Select } from '@mui/material';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { ordersActions } from '../../../redux-store/saga/sagaActions';
import ImageUpload from '../../ImageUpload/ImageUpload';

import * as yup from 'yup';
import { IMAGE_URL } from '../../../shared/utils/_constans';

const validationSchema = yup.object({
  count: yup.string('Введите количество').required('Поле обязательно'),
});

const DialogOrder = ({ hideDialog, showNoti, readyData }) => {
  const dispatch = useDispatch();
  const order = readyData || null;
  console.log('order', order);

  const formik = useFormik({
    initialValues: {
      products: order?.products || [],
      status: order?.status || '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      values.id = order.id;
      // dispatch({ type: productsActions.EDIT_PRODUCT, order: values });
      hideDialog();
      showNoti({ type: 'success', message: 'Товар успешно изменен!' });
      resetForm();
    },
  });

  return (
    <div>
      <p>Изменить заказ</p>
      <form onSubmit={formik.handleSubmit}>
        <InputLabel>Товары</InputLabel>
        {formik.values.products.map((elem, idx) => {
          return (
            <FormControl key={elem.id} variant='standard' fullWidth style={{ marginBottom: '20px' }}>
              <TextField
                label='Название'
                variant='standard'
                value={elem.name}
                type='text'
                name='name'
                fullWidth
                style={{ marginBottom: '20px' }}
                InputProps={{
                  readOnly: true,
                }}
              />
              <img src={IMAGE_URL + elem.image} alt={elem.name}  style={{ marginBottom: '20px' }} />
              <TextField
                label='Цена'
                variant='standard'
                value={elem.price}
                type='text'
                name='price'
                fullWidth
                style={{ marginBottom: '20px' }}
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                label='Количество'
                variant='standard'
                value={formik.values.products[idx].count}
                type='text'
                name='count'
                onChange={formik.handleChange}
                error={formik.touched.count && Boolean(formik.errors.count)}
                helperText={formik.touched.count && formik.errors.count}
                fullWidth
                style={{ marginBottom: '20px' }}
              />
            </FormControl>
          );
        })}

        <FormControl variant='standard' fullWidth style={{ marginBottom: '20px' }}>
          <InputLabel>Статус</InputLabel>
          <Select native name='status' value={formik.values.status} label='Статус' onChange={formik.handleChange} error={formik.touched.status && Boolean(formik.errors.status)}>
            <option value='in_progress'>В работе</option>
            <option value='ready'>Выполнен</option>
          </Select>
        </FormControl>
        <DialogActions style={{ marginTop: '20px' }}>
          <Button onClick={() => hideDialog()}>Закрыть</Button>
          <Button variant='contained' type='submit'>
            Изменить заказ
          </Button>
        </DialogActions>
      </form>
    </div>
  );
};

export default DialogOrder;
