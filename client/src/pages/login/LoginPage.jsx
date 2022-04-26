import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../../redux-store/saga/sagaActions";

export default function LoginPage() {
    const dispatch = useDispatch();
    const { error } = useSelector(state => state.login)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const Login = () => {
        const payload = {email, password};
        dispatch({type: loginActions.LOGIN, payload})
    }

    const Registration = () => {
        const payload = {email, password};
        dispatch({type: loginActions.REGISTRATION, payload})
    }

    return (
        <div>
            <input
                type="text"
                value={email}
                placeholder='Email'
                onChange={e => setEmail(e.target.value)} />
            <input
                type="password"
                value={password}
                placeholder='Password'
                onChange={e => setPassword(e.target.value)} />
                <button onClick={Login}>Log in</button>
                <button onClick={Registration}>Registration</button>
            {error && <p>{error}</p>}
        </div>
    )
}