import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from '@redux-saga/core';
import { rootSaga } from './saga/rootSaga';

import dialogSlice from './slices/dialogSlice';
import productSlice from './slices/productSlice';
import userSlice from './slices/userSlice';
import categoriesSlice from './slices/categoriesSlice';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  dialog: dialogSlice,
  products: productSlice,
  categories: categoriesSlice,
  user: userSlice,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware({ thunk: false, serializableCheck: false }), sagaMiddleware],
});
sagaMiddleware.run(rootSaga);

export default store;
