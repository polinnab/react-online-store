import axios from "axios";
import { put, call, takeLatest, takeEvery } from "redux-saga/effects";
import { checkAuth, login, logout, registration, setError, setLoading } from "../slices/loginSlice";
import { LOCAL_HOST, PORT } from '../../shared/utils/_constans';
import { loginActions } from "./sagaActions";
import { post } from './_apiRequests';


export const API_URL = 'http://localhost:5001/api'




function* loginWorker(action) {
    const { 
        payload: {email, password} 
    } = action;

    try {
        const response = yield call(axios.post, `${LOCAL_HOST}${PORT}/api/login`, {email, password}); //TODO: need refactor for call request. delete ${LOCAL_HOST}${PORT}

        localStorage.setItem('token', response.data.accessToken);
        yield put(login(response.data.user))
    } catch(e) {
        console.log(e.response.data.message) //TODO: delete all error logs
        yield put(setError(e.response.data.message))
    }
}

function* logoutWorker() {
    try {
        yield call(axios.get, `${LOCAL_HOST}${PORT}/api/logout`);
        localStorage.removeItem('token');
        yield logout();
    } catch(e) {
        console.log(e.response.data.message) // delete all error logs
        yield put(setError(e.response.data.message))
    }
}

function* registrationWorker(action) {
    const { 
        payload: {email, password} 
    } = action;

    try {
        const response = yield call(axios.post, `${LOCAL_HOST}${PORT}/api/registration`, {email, password}); //TODO: need refactor for call request. delete ${LOCAL_HOST}${PORT}
        localStorage.setItem('token', response.data.accessToken);
        yield put(registration(response.data.user));
        // yield put(login(response.data.user));
    } catch(e) {
        console.log(e.response.data.message) //TODO: delete all error logs
        yield put(setError(e.response.data.message))
    }
}

function* checkAuthWorker() {
    // yield put(setLoading(true));
    try {
        const response = yield call(axios.get, `${API_URL}/refresh`, {withCredentials: true}); //TODO: need refactor for call request. delete ${LOCAL_HOST}${PORT}
        localStorage.setItem('token', response.data.accessToken);
        yield put(checkAuth(response.data.user));
    } catch(e) {
        console.log('e:', e.response)
        console.log(e.response.data.message) //TODO: delete all error logs
        // yield put(setError(e.response.data.message))
    }
    // yield put(setLoading(false))
}

export function* loginWatcher() {
    yield takeLatest(loginActions.LOGIN, loginWorker)
    yield takeLatest(loginActions.LOGOUT, logoutWorker)
    yield takeLatest(loginActions.REGISTRATION, registrationWorker)
    yield takeLatest(loginActions.CHECK_AUTH, checkAuthWorker)
}

