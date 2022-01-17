import React from 'react';
import { TextField, Button, DialogActions, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  name: yup.string('Введите название').required('Поле обязательно'),
  desc: yup.string('Введите описание').required('Поле обязательно'),
  price: yup.string('Введите цену').required('Поле обязательно'),
  type: yup.string('Выберите тип').required('Поле обязательно'),
  brand: yup.string('Выберите бренд').required('Поле обязательно'),
  color: yup.string('Выберите цвет').required('Поле обязательно'),
});

const DialogProduct = ({ hideDialog }) => {
  const types = [
    {
      id: 1,
      name: 'Sneakers',
    },
  ];

  const colors = [
    {
      id: 1,
      name: 'Brown',
    },
  ];

  const brands = [
    {
      id: 1,
      name: 'Nike',
    },
  ];

  const formik = useFormik({
    initialValues: {
      name: '',
      desc: '',
      price: '',
      type: '',
      brand: '',
      color: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
      hideDialog({ type: 'success', message: 'Товар успешно добавлен!' });
    },
  });

  return (
    <div>
      <p>Добавить товар</p>
      <form onSubmit={formik.handleSubmit}>
        <FormControl variant='standard' fullWidth style={{ marginBottom: '20px' }}>
          <InputLabel>Тип</InputLabel>
          <Select name='type' value={formik.values.type} label='Тип' onChange={formik.handleChange} error={formik.touched.type && Boolean(formik.errors.type)}>
            {types.map((elem) => (
              <MenuItem key={elem.id} value={elem.id}>
                {elem.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant='standard' fullWidth style={{ marginBottom: '20px' }}>
          <InputLabel>Бренд</InputLabel>
          <Select name='brand' value={formik.values.brand} label='Бренд' onChange={formik.handleChange} error={formik.touched.brand && Boolean(formik.errors.brand)}>
            {brands.map((elem) => (
              <MenuItem key={elem.id} value={elem.id}>
                {elem.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant='standard' fullWidth>
          <InputLabel>Цвет</InputLabel>
          <Select name='color' value={formik.values.color} label='Цвет' onChange={formik.handleChange} error={formik.touched.color && Boolean(formik.errors.color)}>
            {colors.map((elem) => (
              <MenuItem key={elem.id} value={elem.id}>
                {elem.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField label='Название' variant='standard' value={formik.values.name} type='text' name='name' onChange={formik.handleChange} error={formik.touched.name && Boolean(formik.errors.name)} helperText={formik.touched.name && formik.errors.name} fullWidth />
        <TextField label='Описание' variant='standard' value={formik.values.desc} type='text' name='desc' onChange={formik.handleChange} error={formik.touched.desc && Boolean(formik.errors.desc)} helperText={formik.touched.desc && formik.errors.desc} fullWidth />
        <TextField label='Цена' variant='standard' value={formik.values.price} type='text' name='price' onChange={formik.handleChange} error={formik.touched.price && Boolean(formik.errors.price)} helperText={formik.touched.price && formik.errors.price} fullWidth />
        <DialogActions style={{ marginTop: '20px' }}>
          <Button onClick={() => hideDialog()}>Закрыть</Button>
          <Button variant='contained' type='submit'>
            Добавить товар
          </Button>
        </DialogActions>
      </form>
    </div>
  );
};

export default DialogProduct;
