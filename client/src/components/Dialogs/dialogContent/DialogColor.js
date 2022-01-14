import React from 'react';
import { TextField, Button, DialogActions } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  color: yup.string('Введите цвет').required('Поле обязательно'),
});

const DialogColor = ({ hideDialog }) => {
  const formik = useFormik({
    initialValues: {
      color: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(JSON.stringify(values.color, null, 2));
      hideDialog({ type: 'success', message: 'Цвет успешно добавлен!' })
    },
  });

  return (
    <div>
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