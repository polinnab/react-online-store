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
    InputAdornment
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import { login_route } from "../../shared/utils/_constans";

import './registrationFrom.scss';
import { validateEmail, validateLogin, validatePassword, validateRole } from "../../shared/validation/loginRegistration";

export default function RegistrationForm() {
    const dispatch = useDispatch();
    const { error } = useSelector(state => state.login)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [login, setLogin] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [validationError, setValidationError] = useState('');

    const handleSubmit = (event) => {
      const isValid = validateLogin(login) || validateEmail(email) || validatePassword(password) || validateRole(role);
      setValidationError(isValid);
      if (!isValid) {
        const payload = {
            candidate: {email, password, login, role}
        };
        dispatch({type: loginActions.REGISTRATION, payload})
      }
      event.preventDefault();
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
            <form onSubmit={handleSubmit} className="RegistrationForm--form">
                <TextField
                    id="user-login"
                    label="Login"
                    value={login}
                    onChange={(event) => setLogin(event.target.value)}
                />
                <TextField
                    id="user-email"
                    label="Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
                <FormControl sx={{ width: '100%' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
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
                {validationError && <p className="LoginForm--error">{validationError}</p>}
                {error && <p className="RegistrationForm--error">{error}</p>}
                <button type="submit" className='RegistrationForm--button btn btn--orange'>Registration</button>
            </form>
            <NavLink to={login_route}><button className='RegistrationForm--button btn'>Back</button></NavLink>
        </div>
    )
}
