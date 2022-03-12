import React, { useState } from 'react';
import { useFormik } from 'formik';
import { FormControl, InputLabel, TextField, Button, DialogActions, Select } from '@mui/material';
import * as yup from 'yup';
import InputMask from 'react-input-mask';
import { userActions } from '../../redux-store/saga/sagaActions';
import { useDispatch } from 'react-redux';


const validationSchema = yup.object().shape({
  name: yup.string().required('Поле обязательно'),
  email: yup.string().email('Некорректный email').required('Поле обязательно'),
  password: yup.string().min(6, 'Минимальная длина 6 символов').max(20, 'Слишком длинный пароль').required('Поле обязательно'),
  phone: yup.string().test('len', 'Введите номер телефона', (val) => val?.replace(new RegExp('_', 'g'), '').length >= 19),
});

const Auth = () => {
  const dispatch = useDispatch();
  const [type, setType] = useState('user');
  const [isAuth, setIsAuth] = useState(true);

  const formik = useFormik({
    initialValues: {
      name: 'name',
      phone: '+38 (123) 123 12 31',
      role: 'user',
      email: 'aso@anadeainc.com',
      password: 'password',
    },
    validationSchema,
    onSubmit: (values) => {
      const authData = {
        authEmail: values.email,
        password: values.password
      }
      if (!isAuth) {
        authData.type = 'register'
        dispatch({ type: userActions.AUTH_USER, user: authData });
      } else {
        authData.type = 'auth'
        dispatch({ type: userActions.AUTH_USER, user: authData });
      }
    },
  });

  const changeUserType = (e) => {
    formik.handleChange(e);
    setType(e.target.value);
  };

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <InputLabel>Авторизация</InputLabel>
        {!isAuth ? (
          <React.Fragment>
            <FormControl variant='standard' fullWidth style={{ marginBottom: '20px' }}>
              <TextField
                label={type === 'user' ? 'Имя' : 'Название'}
                variant='standard'
                type='text'
                name='name'
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                fullWidth
                style={{ marginBottom: '20px' }}
              />
            </FormControl>

            <FormControl variant='standard' fullWidth style={{ marginBottom: '20px' }}>
              <InputMask
                mask='+38 (999) 999 99 99'
                value={formik.values.phone}
                label='Телефон'
                style={{ marginBottom: '20px' }}
                name='phone'
                type='tel'
                onChange={formik.handleChange}
                variant='standard'
                fullWidth
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}>
                {(inputProps) => <TextField {...inputProps} />}
              </InputMask>
            </FormControl>

            <FormControl variant='standard' fullWidth style={{ marginBottom: '20px' }}>
              <InputLabel>Тип</InputLabel>
              <Select native name='role' value={formik.values.role} label='Тип' onChange={(e) => changeUserType(e)} error={formik.touched.role && Boolean(formik.errors.role)}>
                <option value='user'>Пользователь</option>
                <option value='shop'>Магазин</option>
              </Select>
            </FormControl>
          </React.Fragment>
        ) : null}
        <FormControl variant='standard' fullWidth style={{ marginBottom: '20px' }}>
          <TextField
            label='Email'
            variant='standard'
            type='email'
            name='email'
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            fullWidth
            style={{ marginBottom: '20px' }}
          />
        </FormControl>

        <FormControl variant='standard' fullWidth style={{ marginBottom: '20px' }}>
          <TextField
            label='Пароль'
            variant='standard'
            type='password'
            name='password'
            fullWidth
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            style={{ marginBottom: '20px' }}
          />
        </FormControl>
        <DialogActions style={{ marginTop: '20px' }}>
          {isAuth ? (
            <Button variant='contained' type='div' onClick={() => setIsAuth(false)}>
              Регистрация
            </Button>
          ) : (
            <Button variant='contained' type='div' onClick={() => setIsAuth(true)}>
              Авторизация
            </Button>
          )}

          <Button variant='contained' type='submit'>
            {isAuth ? 'Войти' : 'Зарегистрироваться'}
          </Button>
        </DialogActions>
      </form>
    </div>
  );
};

export default Auth;
