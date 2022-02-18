import { get, edit } from './_apiRequests';
import { LOCAL_HOST, PORT } from '../../shared/utils/_constans';
import { put, takeEvery } from 'redux-saga/effects';
import { getUser, getSoc } from '../slices/userSlice';
import { userActions } from './sagaActions';

function* getAllSoc(action) {
  const data = yield get(`${LOCAL_HOST}${PORT}/api/soc`);
  yield put(getSoc(data));
}

function* getUserInfo(action) {
  const data = yield get(`${LOCAL_HOST}${PORT}/api/user`, { id: action.id });
	yield put(getUser(data))
}

function* editUser(action) {
  yield edit(`${LOCAL_HOST}${PORT}/api/user`, { options: action.user });
}

export function* userSaga() {
  yield takeEvery(userActions.GET_ALL_SOC, getAllSoc);
  yield takeEvery(userActions.GET_USER, getUserInfo);
  yield takeEvery(userActions.EDIT_USER, editUser);
}
