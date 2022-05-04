import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../../redux-store/saga/sagaActions";
import { TextField, Button, FormControl, OutlinedInput, IconButton, InputAdornment, InputLabel } from '@mui/material';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import "./loginFrom.scss"

export default function LoginForm() {
    const dispatch = useDispatch();
    const { error } = useSelector(state => state.login)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const Login = () => {
        const payload = {email, password};
        dispatch({type: loginActions.LOGIN, payload})
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };  
    
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <div>
            <form className="LoginForm--form">
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
                <Button className="LoginForm--button" 
                    variant='contained' 
                    onClick={Login}>
                    Log in
                </Button>
            </form>
            {error && <p className="LoginForm--error">{error}</p>}
        </div>
    )
}