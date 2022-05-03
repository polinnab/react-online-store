import React from "react";
import { useSelector } from "react-redux";
import LoginForm from "../../components/LoginForm/LoginForm";
import { NavLink } from 'react-router-dom';
import { registration_route } from "../../shared/utils/_constans";

import './login.scss';

export default function LoginPage() {
  const { isAuth, user } = useSelector((state) => state.login);

  if (isAuth) return(
    <div>
      <h1>{isAuth ? `Welcome, ${user.email}!` : 'Log in, please'}</h1>
    </div>
  )


  return (
    <div className="LoginPage--container">
      <>
        <LoginForm/>
        <p>Don't have account? Register please</p>
        <NavLink to={registration_route}><button className='btn btn--orange'>Let Registrated!</button></NavLink></>
    </div>
  );
}