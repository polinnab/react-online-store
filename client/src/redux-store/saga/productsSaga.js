import { get, post, remove } from './_apiRequests';
import { LOCAL_HOST, PORT } from '../../shared/utils/_constans';
import { all, put, takeEvery } from 'redux-saga/effects';
import { getProducts } from '../slices/productSlice';
import { productsActions } from './sagaActions';

function* getAllProducts(action) {
  const data = yield get(`${LOCAL_HOST}${PORT}/api/products`)
  yield put(getProducts(data));
}

function* addProduct(action) {
  const options = {
    product: action.product,
  };

  yield post(`${LOCAL_HOST}${PORT}/api/products`, {options: JSON.stringify(options)})
  yield getAllProducts();
}

function* removeProduct(action) {
  const options = {
    id: action.val,
  };

  yield remove(`${LOCAL_HOST}${PORT}/api/products`, {options: JSON.stringify(options)})
  yield getAllProducts();
}


function* getProduct(action) {
  const data = yield get(`${LOCAL_HOST}${PORT}/api/products`)
  yield getProducts(data);
}

export function* productsSaga() {
  yield all([getAllProducts()])
  // yield takeEvery(productsActions.GET_ALL_PRODUCTS, getAllProducts);
  yield takeEvery(productsActions.ADD_PRODUCT, addProduct);
  yield takeEvery(productsActions.REMOVE_PRODUCT, removeProduct);
}

