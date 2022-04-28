import React from "react";
import { useSelector } from "react-redux";
import LoginForm from "../../components/LoginForm/LoginForm";

export default function LoginPage() {
  const { isAuth, user } = useSelector((state) => state.login);


  if (!isAuth) {
    return (
      <>
        <LoginForm/>
      </>
    )
  }

  return (
    <div>
      <h1>{isAuth ? `Welcome, ${user.email}!` : 'Log in, please'}</h1>
    </div>
  );
}