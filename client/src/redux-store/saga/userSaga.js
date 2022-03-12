import { get, post, edit } from './_apiRequests';
import { LOCAL_HOST, PORT } from '../../shared/utils/_constans';
import { call, put, takeEvery } from 'redux-saga/effects';
import { getUser, getSoc, setUser } from '../slices/userSlice';
import { userActions } from './sagaActions';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';

function* getAllSoc(action) {
  const data = yield get(`${LOCAL_HOST}${PORT}/api/soc`);
  yield put(getSoc(data));
}

function* getUserInfo(action) {
  const data = yield get(`${LOCAL_HOST}${PORT}/api/user`, { id: action.id });
  yield put(getUser(data));
}

function* authUser(action) {
  const { authEmail, password, type } = action.user;

  const authFunc = type === 'auth' ? signInWithEmailAndPassword : createUserWithEmailAndPassword;

  try {
    const auth = getAuth();
    const result = yield call(authFunc, auth, authEmail, password);

    const { accessToken, email, uid } = result.user;
    yield put(
      setUser({
        id: uid,
        email,
        token: accessToken,
      })
    );
  } catch (error) {
    console.log('error', error);
    // const error_message = { code: error.code, message: error.message };
  }
}

function* logoutUser(action) {
  try {
    const auth = getAuth();
    const emptyUser = {
      id: null,
      email: null,
      token: null,
      isAuth: false,
    };
    yield call(signOut, auth);
    yield setUserData({user: emptyUser});
  } catch (error) {
    console.log('error', error);
    // const error_message = { code: error.code, message: error.message };
  }
}

function* setUserData(action) {
  const { token, email, id, isAuth } = action.user;
  console.log('setUserData', action.user);
  yield put(
    setUser({
      id,
      email,
      token,
      isAuth,
    })
  );
}

function* editUser(action) {
  yield edit(`${LOCAL_HOST}${PORT}/api/user`, { options: action.user });
}

export function* userSaga() {
  yield takeEvery(userActions.GET_ALL_SOC, getAllSoc);
  yield takeEvery(userActions.GET_USER, getUserInfo);
  yield takeEvery(userActions.SET_USER, setUserData);
  yield takeEvery(userActions.EDIT_USER, editUser);
  yield takeEvery(userActions.AUTH_USER, authUser);
  yield takeEvery(userActions.LOGOUT, logoutUser);
}
