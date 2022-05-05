import React from "react";
import { useSelector } from "react-redux";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import { registration_route } from "../../shared/utils/_constans";
import { NavLink } from 'react-router-dom';

import './registration.scss';

export default function RegistrationPage() {
  const { isAuth, user } = useSelector((state) => state.login);

  if (isAuth) return(
    <div className="LoginPage--container">
      <h1>{isAuth ? `Welcome, ${user.email}!` : 'Log in, please'}</h1>
      <NavLink to={registration_route}><button className='btn btn--orange'>Let's Shopping!</button></NavLink>
    </div>
  );

  return (
    <div className="LoginPage--container">
      <RegistrationForm></RegistrationForm>
    </div>
  );
}