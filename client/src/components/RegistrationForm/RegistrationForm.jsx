import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../../redux-store/saga/sagaActions";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { NavLink } from 'react-router-dom';
import FormControl from '@mui/material/FormControl';
import { login_route } from "../../shared/utils/_constans";

import './registrationFrom.scss';

export default function RegistrationForm() {
    const dispatch = useDispatch();
    const { error } = useSelector(state => state.login)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [login, setLogin] = useState('');

    const Registration = () => {
        const payload = {
            candidate: {email, password, login, role}
        };
        dispatch({type: loginActions.REGISTRATION, payload})
    };

    const handleChangeRole = (event) => {
        setRole(event.target.value);
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
                <TextField
                    required
                    id="user-password"
                    label="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
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
            </form>
            <button className='RegistrationForm--button btn btn--orange' onClick={Registration}>Registration</button>
            <NavLink to={login_route}><button className='RegistrationForm--button btn'>Back</button></NavLink>
            {error && <p>{error}</p>}
        </div>
    )
}