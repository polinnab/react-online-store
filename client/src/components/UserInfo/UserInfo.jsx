import React, { useState } from 'react';
import { Grid, TextField, Button, FormControl } from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';

const UserInfo = () => {
  const submit = (e) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={(event) => submit(event)}>
      <Grid container direction='row' justifyContent='flex-start' alignItems='flex-start' flexWrap='nowrap' spacing={0}>
        <PersonOutlineIcon />
        <FormControl variant='standard' fullWidth style={{ marginBottom: '20px' }}>
          <TextField label='Логин' variant='standard' type='text' name='login' fullWidth style={{ marginBottom: '20px' }} />
          <TextField label='ФИО' variant='standard' type='text' name='name' fullWidth style={{ marginBottom: '20px' }} />
        </FormControl>
      </Grid>
      <Grid container direction='row' justifyContent='flex-start' alignItems='flex-start' flexWrap='nowrap' spacing={0}>
        <LocalPhoneIcon />
        <FormControl variant='standard' fullWidth style={{ marginBottom: '20px' }}>
          <TextField label='Телефон' variant='standard' type='tel' name='phone' fullWidth style={{ marginBottom: '20px' }} />
        </FormControl>
      </Grid>
      <Grid container direction='row' justifyContent='flex-start' alignItems='flex-start' flexWrap='nowrap' spacing={0}>
        <EmailIcon />
        <FormControl variant='standard' fullWidth style={{ marginBottom: '20px' }}>
          <TextField label='Email' variant='standard' type='email' name='email' fullWidth style={{ marginBottom: '20px' }} />
        </FormControl>
      </Grid>
      <Grid container direction='row' justifyContent='flex-start' alignItems='flex-start' flexWrap='nowrap' spacing={0}>
        <AlternateEmailIcon />
        <FormControl variant='standard' fullWidth style={{ marginBottom: '20px' }}>
          <TextField label='Соцсети' variant='standard' type='text' name='soc' fullWidth style={{ marginBottom: '20px' }} />
        </FormControl>
      </Grid>
      <Button variant='contained' type='submit'>
        Сохранить
      </Button>
    </form>
  );
};

export default UserInfo;
