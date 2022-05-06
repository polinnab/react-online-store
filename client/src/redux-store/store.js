import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from '@redux-saga/core';
import { rootSaga } from './saga/rootSaga';

import dialogSlice from './slices/dialogSlice';
import productSlice from './slices/productSlice';
import categoriesSlice from './slices/categoriesSlice';
import cartSlice from './slices/cartSlice';
import orderSlice from './slices/orderSlice';
import loginSlice from './slices/loginSlice';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  dialog: dialogSlice,
  products: productSlice,
  categories: categoriesSlice,
  cart: cartSlice,
  order: orderSlice,
  login: loginSlice
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware({ thunk: false, serializableCheck: false }), sagaMiddleware],
});
sagaMiddleware.run(rootSaga);

export default store;
