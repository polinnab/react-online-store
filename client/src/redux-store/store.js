import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from '@redux-saga/core';
import { persistStore, persistReducer } from "redux-persist";
import { rootSaga } from './saga/rootSaga';

import dialogSlice from './slices/dialogSlice';
import productSlice from './slices/productSlice';
import categoriesSlice from './slices/categoriesSlice';
import cartSlice from './slices/cartSlice';
import orderSlice from './slices/orderSlice';
import loginSlice from './slices/loginSlice';

import storage from "redux-persist/lib/storage";

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["login", "cart"],
  blacklist: ["dialog", "products", "categories", "order"],
};

const rootReducer = combineReducers({
  dialog: dialogSlice,
  products: productSlice,
  categories: categoriesSlice,
  cart: cartSlice,
  order: orderSlice,
  login: loginSlice
});

const persistingReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistingReducer,
  middleware: [...getDefaultMiddleware({ thunk: false, serializableCheck: false }), sagaMiddleware],
});

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export default store;
