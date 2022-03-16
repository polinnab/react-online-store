import { get, edit } from './_apiRequests';
import { LOCAL_HOST, PORT } from '../../shared/utils/_constans';
import { call, put, takeEvery } from 'redux-saga/effects';
import { getSoc, setUser } from '../slices/userSlice';
import { userActions } from './sagaActions';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';

function* getAllSoc(action) {
  const data = yield get(`${LOCAL_HOST}${PORT}/api/soc`);
  yield put(getSoc(data));
}

function* getUserInfo(action) {
  const data = yield get(`${LOCAL_HOST}${PORT}/api/user`, { id: action.id });
  console.log('data', data);
  yield put(
    setUser({...data})
  );
}

function* authUser(action) {
  const { authEmail, password, type } = action.user;

  const authFunc = type === 'auth' ? signInWithEmailAndPassword : createUserWithEmailAndPassword;

  try {
    const auth = getAuth();
    const result = yield call(authFunc, auth, authEmail, password);
    const {uid } = result.user;
    yield getUserInfo({id: uid})
  } catch (error) {
    console.log('auth error', error);
  }
}

function* logoutUser(action) {
  const auth = getAuth();
  yield call(signOut, auth);
  yield put(
    setUser({
      id: null,
      email: null,
      token: null,
      isAuth: false,
    })
  );
}

function* editUser(action) {
  yield edit(`${LOCAL_HOST}${PORT}/api/user`, { options: action.user });
}

export function* userSaga() {
  yield takeEvery(userActions.GET_ALL_SOC, getAllSoc);
  yield takeEvery(userActions.GET_USER, getUserInfo);
  yield takeEvery(userActions.EDIT_USER, editUser);
  yield takeEvery(userActions.AUTH_USER, authUser);
  yield takeEvery(userActions.LOGOUT, logoutUser);
}
