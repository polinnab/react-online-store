import React from "react";
import { useSelector } from "react-redux";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";

import './registration.scss';

export default function RegistrationPage() {
  const { isAuth, user } = useSelector((state) => state.login);

  if (isAuth) return(
    <div>
      <h1>{isAuth ? `Welcome, ${user.email}!` : 'Log in, please'}</h1>
    </div>
  );

  return (
    <div className="LoginPage--container">
      <RegistrationForm></RegistrationForm>
    </div>
  );
}