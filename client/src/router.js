import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { authRoutes, publicRoutes } from './shared/utils/_routes';
import { main_route } from './shared/utils/_constans';
import { useSelector } from 'react-redux';

const Router = () => {
  const isAuth = useSelector((state) => state.user.isAuth);
  return (
    <Routes>
      {isAuth && authRoutes.map(({ path, Component }) => <Route key={path} path={path} element={<Component />} exact />)}
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} exact />
      ))}
      <Route path='*' element={<Navigate to={main_route} />} />
    </Routes>
  );
};

export default Router;
