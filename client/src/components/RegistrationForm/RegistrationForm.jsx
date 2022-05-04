import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../../redux-store/saga/sagaActions";
import {
    InputLabel, 
    MenuItem,
    Select,
    TextField,
    FormControl,
    OutlinedInput,
    IconButton,
    InputAdornment,
    Button
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import { login_route } from "../../shared/utils/_constans";

import './registrationFrom.scss';

export default function RegistrationForm() {
    const dispatch = useDispatch();
    const { error } = useSelector(state => state.login)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [login, setLogin] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const Registration = () => {
        const payload = {
            candidate: {email, password, login, role}
        };
        console.log('payload: ', payload)
        dispatch({type: loginActions.REGISTRATION, payload})
    };

    const handleChangeRole = (event) => {
        setRole(event.target.value);
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };  
    
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <div className="RegistrationForm--container">
            <form className="RegistrationForm--form">
                <TextField
                    required
                    id="user-login"
                    label="Login"
                    value={login}
                    onChange={(event) => setLogin(event.target.value)}
                />
                <TextField
                    required
                    id="user-email"
                    label="Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
                <FormControl sx={{ width: '100%' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                      required
                      id="outlined-adornment-password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                </FormControl>
                <div className="RegistrationForm--select-block">
                <FormControl fullWidth>
                    <InputLabel id="user-role">Role</InputLabel>
                    <Select
                      labelId="user-role"
                      id="user-role"
                      value={role}
                      className="RegistrationForm--select"
                      label="Role"
                      onChange={handleChangeRole}
                    >
                      <MenuItem value={'user'}>User</MenuItem>
                      <MenuItem value={'admin'}>Admin</MenuItem>
                    </Select>
                </FormControl>
                </div>
                {error && <p className="RegistrationForm--error">{error}</p>}
            </form>
                <button className='RegistrationForm--button btn btn--orange' onClick={Registration}>Registration</button>
            <NavLink to={login_route}><button className='RegistrationForm--button btn'>Back</button></NavLink>
        </div>
    )
}

// TODO: need validation 