import React from 'react';
import { TextField, Button, DialogActions } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  type: yup.string('Введите тип').required('Поле обязательно'),
});

const DialogType = ({ hideDialog }) => {
  const formik = useFormik({
    initialValues: {
      type: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(JSON.stringify(values.type, null, 2));
      hideDialog({ type: 'success', message: 'Тип успешно добавлен!' })
    },
  });

  return (
    <div>
      <p>Добавить тип</p>
      <form onSubmit={formik.handleSubmit}>
        <TextField label='Тип' variant='standard' value={formik.values.type} type='text' name='type' onChange={formik.handleChange} error={formik.touched.type && Boolean(formik.errors.type)} helperText={formik.touched.type && formik.errors.type} fullWidth />
        <DialogActions style={{ marginTop: '20px' }}>
          <Button onClick={() => hideDialog()}>Закрыть</Button>
          <Button variant='contained' type='submit'>
            Добавить тип
          </Button>
        </DialogActions>
      </form>
    </div>
  );
};

export default DialogType