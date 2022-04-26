import React, {useEffect} from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { authRoutes, publicRoutes } from './shared/utils/_routes';
import { main_route } from './shared/utils/_constans';
import { useDispatch, useSelector } from 'react-redux';
import { loginActions } from './redux-store/saga/sagaActions';

const Router = () => {
  // const isAuth = useSelector((state) => state.user.isAuth);
  const isAuth = useSelector(state => state.login.isAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('localStorage.getItem(token): ', localStorage.getItem('token'))
    if (localStorage.getItem('token')) {
      dispatch({type: loginActions.CHECK_AUTH})
    }
  }, []);

  return (
    <Routes>
      {isAuth && authRoutes.map(({ path, Component, exact }) => <Route key={path} path={path} element={<Component />} exact={exact} />)}
      {publicRoutes.map(({ path, Component, exact }) => (
        <Route key={path} path={path} element={<Component />} exact={exact} />
      ))}
      <Route path='*' element={<Navigate to={main_route} />} />
    </Routes>
  );
};

export default Router;
