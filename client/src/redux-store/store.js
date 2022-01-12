import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from "@redux-saga/core"
import { rootSaga } from './saga/rootSaga';
import { rootReduser } from './redux-reducers/rootReducer';

const sagaMiddleware = createSagaMiddleware();


export const store = createStore(
  rootReduser,
  applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(rootSaga)
