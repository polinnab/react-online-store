import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, TextField, Button, FormControl, Select, MenuItem } from '@mui/material';
import { PersonRounded, LocalPhoneRounded, EmailRounded, AlternateEmailRounded, FacebookRounded as Facebook, Twitter, Instagram, Telegram, Delete } from '@mui/icons-material';
import { useFormik } from 'formik';
import InputMask from 'react-input-mask';
import { userActions } from '../../redux-store/saga/sagaActions';
import * as yup from 'yup';
import './userInfo.scss';

const validationSchema = yup.object({
  name: yup.string().matches(/^[aA-zZа-яА-Я\s]+$/, 'Введите имя'),
  email: yup.string().email('Введите email').required('Поле обязательно'),
  phone: yup.string().test('len', 'Введите номер телефона', (val) => val?.replace(new RegExp('_', 'g'), '').length >= 19),
});


const iconsList = [
  {
    Facebook,
  },
  {
    Twitter,
  },
  {
    Instagram,
  },
  {
    Telegram,
  },
];

const UserInfo = () => {
  const dispatch = useDispatch();
  const { user, socList } = useSelector((state) => state.user);
  const [soc, setSoc] = useState([]);

  useEffect(() => {
     dispatch({ type: userActions.GET_USER, id: user.id })
  }, [dispatch]);

  useEffect(() => {
     setSoc(user.soc)
  }, [user]);

  useEffect(() => {
    dispatch({ type: userActions.GET_ALL_SOC });
  }, [dispatch]);


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: user.id || '',
      login: user.login || '',
      name: user.name || '',
      phone: user.phone || '',
      email: user.email || '',
      soc,
      address: user.address || ''
    },
    validationSchema,
    onSubmit: (values) => {
      values.soc = soc;
      if (user.role !== 'Shop') {
        delete values.address
      }
      dispatch({ type: userActions.EDIT_USER, user: values });
    },
  });

  const addSoc = () => {
    setSoc([...soc, { id: '', name: '', link: '' }]);
  };

  const changeSoc = (e, current, socList) => {
    const socId = e.target.value;
    const newSoc = socList.filter((elem) => elem.id === socId);

    setSoc(soc.map((elem) => (elem.id === current ? newSoc[0] : elem)));
  };

  const changeSocLink = (e, socId) => {
    const link = e.target.value;
    const socLink = soc.map((elem) => {
      if (elem.id === socId) {
        const socElem = { ...elem };
        socElem.link = link;
        return socElem;
      }

      return elem;
    });

    setSoc(socLink);
  };

  const removeSoc = (socId) => {
    setSoc(soc.filter((elem) => elem.id !== socId));
  };



  return user.name ? (
    <form onSubmit={formik.handleSubmit} className='user-form'>
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
          <TextField label={user.role === 'Shop' ? 'Название': 'ФИО'} variant='standard' type='text' name='name' fullWidth style={{ marginBottom: '20px' }} onChange={formik.handleChange} value={formik.values.name} error={formik.touched.name && Boolean(formik.errors.name)} helperText={formik.touched.name && formik.errors.name} />
          {user.address ? <TextField label='Адрес' variant='standard' type='text' name='address' fullWidth style={{ marginBottom: '20px' }} onChange={formik.handleChange} value={formik.values.address}/> : null}
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
      {socList?.length ? (
        <Grid container direction='row' justifyContent='flex-start' alignItems='flex-start' flexWrap='nowrap' spacing={0} className='user-form__item'>
          <AlternateEmailRounded />

          <div className='' style={{ width: '100%' }}>
            {soc.map((elem) => {
              return (
                <FormControl key={elem.id} variant='standard' fullWidth style={{ marginBottom: '20px' }} className='user-form__item-soc'>
                  <Select label='Соцсеть' name='soc' value={elem.id} onChange={(e) => changeSoc(e, elem.id, socList)}>
                    {socList.map((item) => {
                      const Icon = iconsList.find((elem) => elem[item.name])[item.name];
                      const disabled = soc.filter((elem) => elem.id === item.id).length;
                      return (
                        <MenuItem disabled={disabled ? true : false} key={item.id} value={item.id}>
                          <Icon /> &nbsp; {item.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  <TextField label='Ссылка' variant='standard' type='text' name='soc' style={{ marginBottom: '14px' }} value={elem.link || ''} onChange={(e) => changeSocLink(e, elem.id)} />
                  <Delete onClick={() => removeSoc(elem.id)} />
                </FormControl>
              );
            })}
            {soc.length !== socList?.length ? (
              <FormControl variant='standard' fullWidth style={{ marginBottom: '20px', marginTop: '14px', display: 'flex' }}>
                <Button variant='contained' onClick={addSoc}>
                  Добавить соцсеть
                </Button>
              </FormControl>
            ) : null}
          </div>
        </Grid>
      ) : null}

      <Button variant='contained' type='submit'>
        Сохранить
      </Button>
    </form>
  ) : null;
};

export default UserInfo;
