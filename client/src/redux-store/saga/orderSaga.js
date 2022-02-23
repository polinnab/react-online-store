import { get, edit } from './_apiRequests';
import { LOCAL_HOST, PORT } from '../../shared/utils/_constans';
import { put, takeEvery } from 'redux-saga/effects';
import { getOrders } from '../slices/orderSlice';
import { orderActions } from './sagaActions';

function* getAllOrders(action) {
  const data = yield get(`${LOCAL_HOST}${PORT}/api/orders`, { id: action.id });
  yield put(getOrders(data));
}

function* editOrder(action) {
  const data = yield edit(`${LOCAL_HOST}${PORT}/api/order`, { options: action.order });
  yield put(getOrders(data));
}

export function* orderSaga() {
  yield takeEvery(orderActions.GET_ORDERS, getAllOrders);
  yield takeEvery(orderActions.EDIT_ORDER, editOrder);
}
