import React from 'react';
import { TextField, Button, DialogActions, FormControl, InputLabel, Select } from '@mui/material';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { orderActions } from '../../../redux-store/saga/sagaActions';
import { IMAGE_URL } from '../../../shared/utils/_constans';
import * as yup from 'yup';

const validationSchema = yup.object({
  count: yup.string('Введите количество').required('Поле обязательно'),
});

const DialogOrder = ({ hideDialog, showNoti, readyData }) => {
  const dispatch = useDispatch();
  const order = readyData || null;
  const { user } = useSelector((state) => state.user);

  const formik = useFormik({
    initialValues: {
      products: order?.products || [],
      status: order?.status || '',
    },
    //  validationSchema: validationSchema,
    onSubmit: (values) => {
      values.id = order.id;
      dispatch({ type: orderActions.EDIT_ORDER, order: values });
      hideDialog();
      showNoti({ type: 'success', message: 'Товар успешно изменен!' });
      dispatch({ type: orderActions.GET_ORDERS, id: user.id });
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
              <img src={IMAGE_URL + elem.image} alt={elem.name} style={{ marginBottom: '20px' }} />
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
            <option value='canceled'>Отменен</option>
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
