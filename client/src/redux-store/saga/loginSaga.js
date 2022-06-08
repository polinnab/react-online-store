import { put, takeLatest } from "redux-saga/effects";
import { post, edit } from "../../http/index";
import { ErrorRequestHandler } from "../../shared/utils/_methods";
import { editUser, login, logout, registration, setError } from "../slices/loginSlice";
import { loginActions } from "./sagaActions";

function* loginWorker(action) {
    const { 
        payload: {email, password} 
    } = action;

    try {
        const response = yield post(`/login`, {email, password}) 
        localStorage.setItem('token', response.data.accessToken);
        yield put(login(response.data.user));
    } catch(e) {
        const error = ErrorRequestHandler(e.response)
        yield put(setError(error))
    }
}

function* logoutWorker() {
    try {
        yield post(`/logout`);
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
        const response = yield post(`/registration`, {email, password, login, role});
        localStorage.setItem('token', response.data.accessToken);
        yield put(registration(response.data.user));
    } catch(e) {
        console.log(e.response.data.message);
        yield put(setError(e.response.data.message));
    }
}

function* editUserWorker(action) {
    const user = action.payload;
    try {
        const response = yield edit(`/user/${user.id}`, {user});
        yield put(editUser(response.data.user))
    } catch(e) {
        console.log(e.response.data.message); 
    }
}

export function* loginWatcher() {
    yield takeLatest(loginActions.LOGIN, loginWorker);
    yield takeLatest(loginActions.LOGOUT, logoutWorker);
    yield takeLatest(loginActions.REGISTRATION, registrationWorker);
    yield takeLatest(loginActions.EDIT_USER, editUserWorker)
}

