import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, TextField, Button, FormControl, Select, MenuItem } from '@mui/material';
import { PersonRounded, LocalPhoneRounded, EmailRounded, AlternateEmailRounded, FacebookRounded as Facebook, Twitter, Instagram, Telegram, Delete } from '@mui/icons-material';
import { useFormik } from 'formik';
import { loginActions } from '../../redux-store/saga/sagaActions';

import InputMask from 'react-input-mask';

import * as yup from 'yup';
import './userInfo.scss';
import { dialog } from '../../redux-store/slices/dialogSlice';

const validationSchema = yup.object({
  name: yup.string().matches(/^[aA-zZа-яА-Я\s]+$/, "Name must contain only letters"),
  email: yup.string().email('Enter email').required('Required'),
  phone: yup.string().matches(/^((8|\+7)?)?(\(?\d{3}\)??)?[\d\- ]{7,10}$/, "Incorrect phone number"),
});

const socialNetworks = [
  {id: 1, name: 'Facebook'},
  {id: 2, name: 'Twitter'},
  {id: 3, name: 'Instagram'},
  {id: 4, name: 'Telegram'}];

const iconsList = [{Facebook},{Twitter},{Instagram},{Telegram}];  

const UserInfo = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.login);
  const [soc, setSoc] = useState(user.soc || []); // temporary ?? if we need it at all

  //useEffect(() => {
  //  dispatch({ type: userActions.GET_ALL_SOC }); //[{id: 1, name: 'Facebook'},{id: 2, name: 'Twitter'},{id: 3, name: 'Instagram'},{id: 4, name: 'Telegram'}]
  // }, [dispatch]); // we realy need to get massive of socials from API request??


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: user.id || '',
      login: user.login || '',
      name: user.name || '',
      phone: user.phone || '',
      email: user.email || '',
    },
    validationSchema,
    onSubmit: (values) => {
      const editedData = {...values, soc};
      dispatch({ type: loginActions.EDIT_USER, payload: editedData });
      dispatch(
        dialog({
          visible: true,
          name: 'userEdited',
        })
      );
    },
  });

  const addSoc = () => {
    setSoc([...soc, { id: soc.length + 1, name: '', link: '' }]);
  };

  const changeSoc = (e, current, socialNetworks) => {
    const socId = e.target.value;
    const newSoc = socialNetworks.filter((elem) => elem.id === socId);

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

  return (
    <form onSubmit={formik.handleSubmit} className='user-form'>
      <Grid container direction='row' justifyContent='flex-start' alignItems='flex-start' flexWrap='nowrap' spacing={0} className='user-form__item'>
        <PersonRounded />
        <FormControl variant='standard' fullWidth >
          <TextField
            label='Login'
            variant='standard'
            type='text'
            name='login'
            fullWidth
            className='mb-2'
            InputProps={{
              readOnly: true,
            }}
            onChange={formik.handleChange}
            value={formik.values.login}
          />
          <TextField label='Name' 
                    variant='standard' 
                    type='text' 
                    name='name' 
                    fullWidth 
                    className='mb-2'
                    onChange={formik.handleChange} 
                    value={formik.values.name} 
                    error={formik.touched.name && Boolean(formik.errors.name)} 
                    helperText={formik.touched.name && formik.errors.name} />
        </FormControl>
      </Grid>
      <Grid container direction='row' justifyContent='flex-start' alignItems='flex-start' flexWrap='nowrap' spacing={0} className='user-form__item'>
        <LocalPhoneRounded />
        <FormControl variant="standard" fullWidth>
        <InputMask
            mask='(999) 999 99 99'
            value={formik.values.phone}
            label='Phone'
            className='mb-2'
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
        <FormControl variant='standard' fullWidth>
          <TextField
            label='Email'
            variant='standard'
            type='email'
            name='email'
            fullWidth
            className='mb-2'
            onChange={formik.handleChange}
            value={formik.values.email}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </FormControl>
      </Grid>
      {socialNetworks?.length && (
        <Grid container direction='row' justifyContent='flex-start' alignItems='flex-start' flexWrap='nowrap' spacing={0} className='user-form__item'>
          <AlternateEmailRounded />

          <div className='socialList-block'>
            {soc.map((elem) => {
              return (
                <FormControl key={elem.id} variant='standard' fullWidth className='user-form__item-soc mb-2'>
                  <Select label='Social network' name='soc' value={elem.id} onChange={(e) => changeSoc(e, elem.id, socialNetworks)}>
                    {socialNetworks.map((item) => {
                      const Icon = iconsList.find((elem) => elem[item.name])[item.name];
                      const disabled = soc.filter((elem) => elem.id === item.id).length;
                      return (
                        <MenuItem disabled={disabled ? true : false} key={item.id} value={item.id}>
                          <Icon /> &nbsp; {item.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  <TextField label='Link' variant='standard' type='text' name='soc' className='socialList-link' value={elem.link || ''} onChange={(e) => changeSocLink(e, elem.id)} />
                  <Delete className='socialList-delete' onClick={() => removeSoc(elem.id)} />
                </FormControl>
              );
            })}
            {soc.length !== socialNetworks?.length && (
                <div className='socialList-button'>
                <Button variant='contained' onClick={addSoc} style={{width: '200px'}}>
                  Add Social network
                </Button>
                </div>
            )}
          </div>
        </Grid>
      )}

      <Button variant='contained' type='submit' style={{width: '100%', backgroundColor: '#ff7e1b'}}>
        Save
      </Button>
    </form>
  );
};

export default UserInfo;
