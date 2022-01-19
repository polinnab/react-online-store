import React, { useEffect } from 'react';
import { TextField, Button, DialogActions } from '@mui/material';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { categoriesActions } from '../../../redux-store/saga/sagaActions';
import InfoTable from '../../InfoTable/InfoTable';
import * as yup from 'yup';

const validationSchema = yup.object({
  color: yup.string('Введите цвет').required('Поле обязательно'),
});

const DialogColor = ({ hideDialog, showNoti }) => {const dispatch = useDispatch();
  const colors = useSelector((state) => state.categories.colors);
  const headers = ['Бренды', 'Название', 'Действие'];

  useEffect(() => {
    dispatch({ type: categoriesActions.GET_CAT, category_name: 'colors' });
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      color: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, {resetForm}) => {
      dispatch({ type: categoriesActions.ADD_CAT, category_name: 'colors', val: values.color });
      showNoti({ type: 'success', message: 'Цвет успешно добавлен!' });
      resetForm();
    },
  });

  const removeElem = (id) => {
    dispatch({ type: categoriesActions.REMOVE_CAT, category_name: 'colors', val: id });
  };

  return (
    <div>
      <InfoTable headers={headers} body={colors} removeElem={removeElem} />
      <p>Добавить цвет</p>
      <form onSubmit={formik.handleSubmit}>
        <TextField label='Цвет' variant='standard' value={formik.values.color} type='text' name='color' onChange={formik.handleChange} error={formik.touched.color && Boolean(formik.errors.color)} helperText={formik.touched.color && formik.errors.color} fullWidth />
        <DialogActions style={{ marginTop: '20px' }}>
          <Button onClick={() => hideDialog()}>Закрыть</Button>
          <Button variant='contained' type='submit'>
            Добавить цвет
          </Button>
        </DialogActions>
      </form>
    </div>
  );
};

export default DialogColor