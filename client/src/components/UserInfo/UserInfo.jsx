import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, TextField, Button, FormControl, Select, MenuItem } from '@mui/material';
import { PersonRounded, LocalPhoneRounded, EmailRounded, AlternateEmailRounded, FacebookRounded, Twitter, Instagram, Telegram } from '@mui/icons-material';
import { useFormik } from 'formik';
import InputMask from 'react-input-mask';
import * as yup from 'yup';
import './userInfo.scss';

const validationSchema = yup.object({
  name: yup.string('qwe').matches(/^[aA-zZа-яА-Я\s]+$/, 'Введите имя'),
  email: yup.string('qwe').email('Введите email').required('Поле обязательно'),
  phone: yup.string().test('len', 'Введите номер телефона', (val) => val?.replace(new RegExp('_', 'g'), '').length >= 19),
});

const UserInfo = () => {
  const { user } = useSelector((state) => state.user);
  const [soc, setSoc] = useState({});
  const socIcons = [
    {
      id: 1,
      name: 'Facebook',
      icon: FacebookRounded,
      link: '',
    },
    {
      id: 2,
      name: 'Twitter',
      icon: Twitter,
      link: '',
    },
    {
      id: 3,
      name: 'Instagram',
      icon: Instagram,
      link: '',
    },
    {
      id: 4,
      name: 'Telegram',
      icon: Telegram,
      link: '',
    },
  ];

  const formik = useFormik({
    initialValues: {
      id: user.id,
      login: user.login,
      name: user.name,
      phone: user.phone,
      email: user.email,
      soc: user.soc,
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      console.log('values', values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className='user-form'>
      {socIcons.map((elem) => {
        const Icon = elem.icon;
        return <Icon key={elem.name} />;
      })}
      <Grid container direction='row' justifyContent='flex-start' alignItems='flex-start' flexWrap='nowrap' spacing={0} className='user-form__item'>
        <PersonRounded />
        <FormControl variant='standard' fullWidth style={{ marginBottom: '20px' }}>
          <TextField
            label='Логин'
            variant='standard'
            type='text'
            name='login'
            fullWidth
            style={{ marginBottom: '20px' }}
            InputProps={{
              readOnly: true,
            }}
            onChange={formik.handleChange}
            value={formik.values.login}
          />
          <TextField label='ФИО' variant='standard' type='text' name='name' fullWidth style={{ marginBottom: '20px' }} onChange={formik.handleChange} value={formik.values.name} error={formik.touched.name && Boolean(formik.errors.name)} helperText={formik.touched.name && formik.errors.name} />
        </FormControl>
      </Grid>
      <Grid container direction='row' justifyContent='flex-start' alignItems='flex-start' flexWrap='nowrap' spacing={0} className='user-form__item'>
        <LocalPhoneRounded />
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
      </Grid>
      <Grid container direction='row' justifyContent='flex-start' alignItems='flex-start' flexWrap='nowrap' spacing={0} className='user-form__item'>
        <EmailRounded />
        <FormControl variant='standard' fullWidth style={{ marginBottom: '20px' }}>
          <TextField
            label='Email'
            variant='standard'
            type='email'
            name='email'
            fullWidth
            style={{ marginBottom: '20px' }}
            onChange={formik.handleChange}
            value={formik.values.email}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </FormControl>
      </Grid>
      <Grid container direction='row' justifyContent='flex-start' alignItems='flex-start' flexWrap='nowrap' spacing={0} className='user-form__item'>
        <AlternateEmailRounded />
        <FormControl variant='standard' fullWidth style={{ marginBottom: '20px', display: 'flex' }}>
          <Select name='soc' value={formik.values.soc} onChange={formik.handleChange}>
            <MenuItem value={0}></MenuItem>
            {socIcons.map((elem) => {
              const Icon = elem.icon;
              return (
                <MenuItem key={elem.id} value={elem.id}>
                 <Icon/> {elem.name}
                </MenuItem>
              );
            })}
          </Select>
					<span>test</span>
          {/* <TextField label='Соцсети' variant='standard' type='text' name='soc' fullWidth style={{ marginBottom: '20px' }} onChange={formik.handleChange} value={formik.values.soc.link} /> */}
        </FormControl>
      </Grid>
      <Button variant='contained' type='submit'>
        Сохранить
      </Button>
    </form>
  );
};

export default UserInfo;
