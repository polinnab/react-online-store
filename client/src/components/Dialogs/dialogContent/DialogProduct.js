import React, { useEffect } from 'react';
import { TextField, Button, DialogActions, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { categoriesActions, productsActions } from '../../../redux-store/saga/sagaActions';
import * as yup from 'yup';

const validationSchema = yup.object({
  name: yup.string('Введите название').required('Поле обязательно'),
  desc: yup.string('Введите описание').required('Поле обязательно'),
  price: yup.string('Введите цену').required('Поле обязательно'),
  typeId: yup.string('Выберите тип').required('Поле обязательно'),
  brandId: yup.string('Выберите бренд').required('Поле обязательно'),
  colorId: yup.string('Выберите цвет').required('Поле обязательно'),
});

const DialogProduct = ({ hideDialog, showNoti }) => {
  const dispatch = useDispatch();
  const {brands, colors, types} = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch({ type: categoriesActions.GET_CAT, category_name: 'brands' });
    dispatch({ type: categoriesActions.GET_CAT, category_name: 'types' });
    dispatch({ type: categoriesActions.GET_CAT, category_name: 'colors' });
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      name: '',
      desc: '',
      price: '',
      typeId: '',
      brandId: '',
      colorId: '',
      images: [
        {
          big: '',
          thumb: ''
        }
      ],
    },
    validationSchema: validationSchema,
    onSubmit: (values, {resetForm}) => {
      console.log('values', values);
      dispatch({ type: productsActions.ADD_PRODUCT, product: values });
      showNoti({ type: 'success', message: 'Товар успешно добавлен!' });
      resetForm();
    },
  });

  return (
    <div>
      <p>Добавить товар</p>
      <form onSubmit={formik.handleSubmit}>
        <FormControl variant='standard' fullWidth style={{ marginBottom: '20px' }}>
          <InputLabel>Тип</InputLabel>
          <Select name='typeId' value={formik.values.typeId} label='Тип' onChange={formik.handleChange} error={formik.touched.typeId && Boolean(formik.errors.typeId)}>
            {types.map((elem) => (
              <MenuItem key={elem.id} value={elem.id}>
                {elem.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant='standard' fullWidth style={{ marginBottom: '20px' }}>
          <InputLabel>Бренд</InputLabel>
          <Select name='brandId' value={formik.values.brandId} label='Бренд' onChange={formik.handleChange} error={formik.touched.brandId && Boolean(formik.errors.brandId)}>
            {brands.map((elem) => (
              <MenuItem key={elem.id} value={elem.id}>
                {elem.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant='standard' fullWidth>
          <InputLabel>Цвет</InputLabel>
          <Select name='colorId' value={formik.values.colorId} label='Цвет' onChange={formik.handleChange} error={formik.touched.colorId && Boolean(formik.errors.colorId)}>
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
