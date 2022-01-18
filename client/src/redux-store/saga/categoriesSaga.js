import { get, post, remove } from './_apiRequests';
import { LOCAL_HOST, PORT } from '../../shared/utils/_constans';
import { all, put, takeEvery } from 'redux-saga/effects';
import { getTypes, getBrands, getColors } from '../slices/categoriesSlice';
import { sagaActions } from './sagaActions';

function* fetchTypesListWorker(action) {
  const data = yield get(`${LOCAL_HOST}${PORT}/api/types`);

  yield put(getTypes(data));
}

function* addTypesListWorker(action) {
  const options = {
    name: action.val,
  };
  yield post(`${LOCAL_HOST}${PORT}/api/types`, { options: JSON.stringify(options) })
  yield fetchTypesListWorker()
}

function* removeTypeListWorker(action) {
  const options = {
    id: action.val,
  };
  yield remove(`${LOCAL_HOST}${PORT}/api/types`, { options: JSON.stringify(options) })
  yield fetchTypesListWorker()
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
  yield takeEvery(sagaActions.ADD_TYPE, addTypesListWorker);
  yield takeEvery(sagaActions.GET_TYPES, fetchTypesListWorker);
  yield takeEvery(sagaActions.REMOVE_TYPE, removeTypeListWorker);
  yield all([fetchBrandsListWorker(), fetchColorsListWorker()]);
}
