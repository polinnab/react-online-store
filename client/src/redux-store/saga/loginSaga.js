import axios from "axios";
import { put, call, takeLatest } from "redux-saga/effects";
import $api, { API_URL } from "../../http/index";
import { checkAuth, editUser, login, logout, registration, setError, setLoading } from "../slices/loginSlice";
import { loginActions } from "./sagaActions";

function* loginWorker(action) {
    const { 
        payload: {email, password} 
    } = action;

    try {
        const response = yield call($api.post, `${API_URL}/login`, {email, password}); 
        localStorage.setItem('token', response.data.accessToken);
        yield put(login(response.data.user));
    } catch(e) {
        console.log(e.response.data.message);
        yield put(setError(e.response.data.message));
    }
}

function* logoutWorker() {
    try {
        yield call($api.post, `${API_URL}/logout`);
        localStorage.removeItem('token');
        yield put(logout());
    } catch(e) {
        console.log(e.response.data.message);
        yield put(setError(e.response.data.message));
    }
}

function* registrationWorker(action) {
    const { 
        candidate: {email, password, login, role} 
    } = action.payload;

    try {
        const response = yield call($api.post, `${API_URL}/registration`, {email, password, login, role});
        localStorage.setItem('token', response.data.accessToken);
        yield put(registration(response.data.user));
    } catch(e) {
        console.log(e.response.data.message);
        yield put(setError(e.response.data.message));
    }
}

function* checkAuthWorker() {
    yield put(setLoading(true));
    try {
        const response = yield call(axios.get, `${API_URL}/refresh`, {withCredentials: true});
        localStorage.setItem('token', response.data.accessToken);
        yield put(checkAuth(response.data.user));
    } catch(e) {
        console.log(e.response.data.message); 
    }
    yield put(setLoading(false))
}

function* editUserWorker(action) {
    const user = action.payload;
    try {
        const response = yield call($api.put, `${API_URL}/user/${user.id}`, {user});
        yield put(editUser(response.data.user))
    } catch(e) {
        console.log(e.response.data.message); 
    }
}

export function* loginWatcher() {
    yield takeLatest(loginActions.LOGIN, loginWorker);
    yield takeLatest(loginActions.LOGOUT, logoutWorker);
    yield takeLatest(loginActions.REGISTRATION, registrationWorker);
    yield takeLatest(loginActions.CHECK_AUTH, checkAuthWorker);
    yield takeLatest(loginActions.EDIT_USER, editUserWorker)
}

