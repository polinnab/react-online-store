import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, TextField, Button, FormControl } from '@mui/material';
import { PersonRounded, EmailRounded } from '@mui/icons-material';
import { useFormik } from 'formik';
import { userActions } from '../../redux-store/saga/sagaActions';
import * as yup from 'yup';
import './userInfo.scss';

const validationSchema = yup.object({
  name: yup.string().matches(/^[aA-zZа-яА-Я\s]+$/, 'Введите имя'),
  email: yup.string().email('Введите email').required('Поле обязательно'),
  phone: yup.string().test('len', 'Введите номер телефона', (val) => val?.replace(new RegExp('_', 'g'), '').length >= 19),
});

const UserInfo = () => {
  const { user } = useSelector((state) => state.login);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: user.id || '',
      login: user.login || '',
      email: user.email || '',
      password: user.password || '',
    },
    validationSchema,
    onSubmit: (values) => {
      // values.soc = soc;
      // dispatch({ type: userActions.EDIT_USER, user: values });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className='user-form'>
      <Grid container direction='row' justifyContent='flex-start' alignItems='flex-start' flexWrap='nowrap' spacing={0} className='user-form__item'>
        <PersonRounded />
        <FormControl variant='standard' fullWidth style={{ marginBottom: '20px' }}>
          <TextField
            label='Login'
            variant='standard'
            type='text'
            name='login'
            style={{ marginBottom: '20px' }}
            InputProps={{
              readOnly: true,
            }}
            onChange={formik.handleChange}
            value={formik.values.login}
          />
        </FormControl>
      </Grid>
      <Grid container direction='row' justifyContent='flex-start' alignItems='flex-start' flexWrap='nowrap' spacing={0} className='user-form__item'>
        <EmailRounded />
        <FormControl variant='standard' fullWidth style={{ marginBottom: '20px' }}>
          <TextField
            label='Email'
            variant='standard'
            type='email'
            name='email'
            style={{ marginBottom: '20px' }}
            onChange={formik.handleChange}
            value={formik.values.email}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </FormControl>
      </Grid>

      <Button variant='contained' type='submit'>
        Save
      </Button>
    </form>
  );
};

export default UserInfo;
