import React, { useState } from 'react';
import { TextField, Button, DialogActions, Alert, IconButton } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
// import { createBrand } from '../../../utils/axios/productAPI';

const validationSchema = yup.object({
  brand: yup.string('Введите бренд').required('Поле обязательно'),
});

const DialogBrand = ({ hideDialog }) => {
  const [showNoty, setShowNoti] = useState(false);
  const formik = useFormik({
    initialValues: {
      brand: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(JSON.stringify(values.brand, null, 2));
      setShowNoti(true)
    },
  });

  return (
    <div>
      <p>Добавить бренд</p>
      <form onSubmit={formik.handleSubmit}>
        <TextField label='Бренд' variant='standard' value={formik.values.brand} type='text' name='brand' onChange={formik.handleChange} error={formik.touched.brand && Boolean(formik.errors.brand)} helperText={formik.touched.brand && formik.errors.brand} fullWidth />
        <DialogActions style={{ marginTop: '20px' }}>
          <Button onClick={() => hideDialog()}>Закрыть</Button>
          <Button variant='contained' type='submit'>
            Добавить бренд
          </Button>
        </DialogActions>
      </form>

      <Alert
          severity="success"
          sx={{ mb: 2 }}
        >
          Close me!
        </Alert>
    </div>
  );
};

export default DialogBrand;
