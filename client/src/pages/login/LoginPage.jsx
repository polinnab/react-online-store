import React from "react";
import { useSelector } from "react-redux";
import LoginForm from "../../components/LoginForm/LoginForm";
import { NavLink } from 'react-router-dom';
import { main_route, products_route, registration_route } from "../../shared/utils/_constans";

import './login.scss';

export default function LoginPage() {
  const { isAuth, user } = useSelector((state) => state.login);

  if (isAuth) return(
    <div className="LoginPage--container">
      <h1 className="LoginPage--title">{isAuth ? `Welcome, ${user.email}!` : 'Log in, please'}</h1>
      <NavLink to={products_route}><button className='btn btn--orange'>Let's Shopping!</button></NavLink>
    </div>
  )


  return (
    <div className="LoginPage--container">
      <>
        <LoginForm/>
        <p>Don't have account? Register please</p>
        <NavLink to={registration_route}><button className='btn btn--orange'>Let's Registrated!</button></NavLink></>
    </div>
  );
}