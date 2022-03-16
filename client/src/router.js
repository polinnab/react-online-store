import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { authRoutes, publicRoutes, unauthRoutes } from './shared/utils/_routes';
import { main_route } from './shared/utils/_constans';
import { useSelector } from 'react-redux';
import useAuth from './shared/hooks/useAuth'

const Router = () => {
  const {isAuth} = useAuth();
  return (
    <Routes>
      {isAuth && authRoutes ? authRoutes.map(({ path, Component }) => <Route key={path} path={path} element={<Component />} exact />) : unauthRoutes.map(({ path, Component }) => <Route key={path} path={path} element={<Component />} exact />)}
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} exact />
      ))}
      <Route path='*' element={<Navigate to={main_route} />} />
    </Routes>
  );
};

export default Router;
