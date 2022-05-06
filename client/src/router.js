import React, {useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';
import { authRoutes, publicRoutes } from './shared/utils/_routes';
import { useDispatch, useSelector } from 'react-redux';
import { loginActions } from './redux-store/saga/sagaActions';

const Router = () => {
  const {isAuth} = useSelector(state => state.login);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch({type: loginActions.CHECK_AUTH})
    }
  }, [dispatch]);

  return (
    <Routes>
      {isAuth && authRoutes.map(({ path, Component, exact }) => <Route key={path} path={path} element={<Component />} exact={exact} />)}
      {publicRoutes.map(({ path, Component, exact }) => (
        <Route key={path} path={path} element={<Component />} exact={exact} />
      ))}
    </Routes>
  );
};

export default Router;
