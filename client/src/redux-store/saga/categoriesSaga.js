import { get } from './_apiRequests';
import { LOCAL_HOST, PORT } from '../../shared/utils/_constans';
import { all, put } from 'redux-saga/effects';
import { getTypes, getBrands, getColors } from '../slices/categoriesSlice';

function* fetchTypesListWorker(action) {
  const data = yield get(`${LOCAL_HOST}${PORT}/api/types`);

  yield put(getTypes(data));
}

function* addTypesListWorker(action) {
  const data = yield get(`${LOCAL_HOST}${PORT}/api/types`);

  yield put(getTypes(data));
}

function* fetchBrandsListWorker(action) {
  const data = yield get(`${LOCAL_HOST}${PORT}/api/brands`);

  yield put(getBrands(data));
}

function* fetchColorsListWorker(action) {
  const data = yield get(`${LOCAL_HOST}${PORT}/api/colors`);

  yield put(getColors(data));
}

export function* categoriesSaga() {
  yield all([fetchTypesListWorker()]);
  yield all([fetchBrandsListWorker()]);
  yield all([fetchColorsListWorker()]);
}
