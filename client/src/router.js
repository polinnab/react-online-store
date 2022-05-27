import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { authRoutes, publicRoutes } from './shared/utils/_routes';
import { useSelector } from 'react-redux';
import { main_route } from './shared/utils/_constans';
import NotFoundPage from './pages/404/NotFoundPage';

const Router = () => {
  const {isAuth} = useSelector(state => state.login);

  return (
    <Routes>
      {isAuth && authRoutes.map(({ path, Component, exact }) => <Route key={path} path={path} element={<Component />} exact={exact} />)}
      {publicRoutes.map(({ path, Component, exact }) => (
        <Route key={path} path={path} element={<Component />} exact={exact} />
      ))}
      <Route path='/' element={<Navigate to={main_route} />} exact />
      <Route path='*' element={<NotFoundPage />} exact />
    </Routes>
  );
};

// TODO: create separate routes.map for different roles fexmp: 'user', 'admin'. now user can go to /admin route

export default Router;
