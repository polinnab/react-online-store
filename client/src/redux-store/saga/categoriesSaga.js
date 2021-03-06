import { get, post, remove } from './_apiRequests';
import { LOCAL_HOST, PORT } from '../../shared/utils/_constans';
import { put, takeEvery } from 'redux-saga/effects';
import { getTypes, getBrands, getColors } from '../slices/categoriesSlice';
import { categoriesActions } from './sagaActions';

function* getCategory(action) {
  const catName = action.category_name;

  const data = yield get(`${LOCAL_HOST}${PORT}/api/${catName}`);

  switch (catName) {
    case 'types':
      yield put(getTypes(data));
      break;
    case 'brands':
      yield put(getBrands(data));
      break;
    case 'colors':
      yield put(getColors(data));
      break;
    default:
      break;
  }
}

function* addCategory(action) {
  const catName = action.category_name;
  const options = {
    name: action.val,
  };

  yield post(`${LOCAL_HOST}${PORT}/api/${catName}`, { options: JSON.stringify(options) });
  yield getCategory(action);
}

function* removeCategory(action) {
  const catName = action.category_name;
  const options = {
    id: action.val,
  };

  yield remove(`${LOCAL_HOST}${PORT}/api/${catName}`, { options: JSON.stringify(options) });
  yield getCategory(action);
}

function* getAllCategories(action) {
  const data = yield get(`${LOCAL_HOST}${PORT}/api/categories`);

  for (const item in data) {
    const cat = data[item];
    switch (item) {
      case 'types':
        yield put(getTypes(cat));
        break;
      case 'brands':
        yield put(getBrands(cat));
        break;
      case 'colors':
        yield put(getColors(cat));
        break;
      default:
        break;
    }
  }
}

export function* categoriesSaga() {
  yield takeEvery(categoriesActions.GET_CAT, getCategory);
  yield takeEvery(categoriesActions.ADD_CAT, addCategory);
  yield takeEvery(categoriesActions.REMOVE_CAT, removeCategory);
  yield takeEvery(categoriesActions.GET_ALL_CAT, getAllCategories);
}
