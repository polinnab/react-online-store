import React, { useState } from 'react';
import { TextField, Button, DialogActions, FormControl, InputLabel, Select } from '@mui/material';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { orderActions } from '../../../redux-store/saga/sagaActions';
import { IMAGE_URL } from '../../../shared/utils/_constans';
import * as yup from 'yup';

const DialogOrder = ({ hideDialog, showNoti, readyData }) => {
  const dispatch = useDispatch();
  const [order, setOrder] = useState(readyData || null);
  const [count, setCount] = useState(order.products.map((elem) => elem.count));

  const formik = useFormik({
    initialValues: {
      products: order?.products || [],
      status: order?.status || '',
    },
    onSubmit: (values) => {
      const newOrder = Object.assign({}, order);
      newOrder.products = order.products.map((elem, idx) => {
        const item = Object.assign({}, elem);
        item.count = Number(count[idx]);
        return item;
      });
      newOrder.status = values.status;

      dispatch({ type: orderActions.EDIT_ORDER, order: newOrder });
      hideDialog();
      showNoti({ type: 'success', message: 'Товар успешно изменен!' });
    },
  });

  const changeCount = (e, idx) => {
    const newCount = [...count];
    newCount[idx] = e.target.value;
    setCount(newCount);
  };

  const removeProduct = (id) => {
    const newOrder = Object.assign({}, order);
    newOrder.products = order.products.filter((elem) => elem.id !== id);

    setOrder(newOrder);
    formik.values.products = newOrder.products;
  };

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
                value={count[idx]}
                type='text'
                name='count'
                onChange={(e) => changeCount(e, idx)}
                error={formik.touched.count && Boolean(formik.errors.count)}
                helperText={formik.touched.count && formik.errors.count}
                fullWidth
                style={{ marginBottom: '20px' }}
              />
              {formik.values.products.length > 1 ? (
                <Button variant='contained' onClick={() => removeProduct(elem.id)}>
                  Удалить товар
                </Button>
              ) : null}
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
