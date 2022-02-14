import { get, post, remove, edit } from './_apiRequests';
import { LOCAL_HOST, PORT } from '../../shared/utils/_constans';
import { put, takeEvery } from 'redux-saga/effects';
import { getProducts, getProduct, setTotalCount } from '../slices/productSlice';
import { productsActions } from './sagaActions';

function* getAllProducts(action) {
  const data = yield get(`${LOCAL_HOST}${PORT}/api/products`, {page: action.page, limit: action.limit});
  yield put(getProducts(data.products));
  yield put(setTotalCount(data.totalCount));
}

function* addProduct(action) {
  const options = {
    product: action.product,
  };
  yield post(`${LOCAL_HOST}${PORT}/api/products`, { options: JSON.stringify(options) });
  yield getAllProducts();
}

function* removeProduct(action) {
  const options = {
    id: action.val,
  };
  yield remove(`${LOCAL_HOST}${PORT}/api/products`, { options: JSON.stringify(options) });
  yield getAllProducts();
}

function* editProduct(action) {
  yield edit(`${LOCAL_HOST}${PORT}/api/products`, { options: action.product });
  yield getAllProducts();
}

function* getOneProduct(action) {
  const data = yield get(`${LOCAL_HOST}${PORT}/api/product`, { id: action.id });
  yield put(getProduct(data));
}

function* filterProduct(action) {
  const pagination = `page=${action.pagination.page}&limit=${action.pagination.page}`
  const data = yield get(`${LOCAL_HOST}${PORT}/api/filter?${action.query}${pagination}`);
  yield put(getProducts(data.products));
  yield put(setTotalCount(data.totalCount));
}

export function* productsSaga() {
  yield takeEvery(productsActions.GET_ALL_PRODUCTS, getAllProducts);
  yield takeEvery(productsActions.ADD_PRODUCT, addProduct);
  yield takeEvery(productsActions.EDIT_PRODUCT, editProduct);
  yield takeEvery(productsActions.REMOVE_PRODUCT, removeProduct);
  yield takeEvery(productsActions.GET_PRODUCT, getOneProduct);
  yield takeEvery(productsActions.FILTER_PRODUCT, filterProduct);
}
