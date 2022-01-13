import { combineReducers, configureStore, applyMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from '@redux-saga/core';
import { rootSaga } from './saga/rootSaga';
import { rootReduser } from './redux-reducers/rootReducer';

import dialogSlice from './slices/dialogSlice';

// const sagaMiddleware = createSagaMiddleware();

// export const store = createStore(
//   rootReduser,
//   applyMiddleware(sagaMiddleware)
// )

// sagaMiddleware.run(rootSaga)

const rootReducer = combineReducers({
  dialog: dialogSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});
