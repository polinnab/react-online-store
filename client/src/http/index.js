import axios from "axios";
import { API_URL } from "../shared/utils/_constans";
import { call } from "redux-saga/effects";

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
});

export function* post(url, data, headers) {
    return yield call($api.post, url, data, {
        headers: {
            'Content-Type': 'application/json',
            ...headers
        }
    })
}

export function* get(url, params, headers) {
    return yield call($api.get, `${url}?${new URLSearchParams(params).toString()}`, {
        headers: {
            ...headers
        }
    })
}

export function* edit(url, data, headers) {
    return yield call($api.put, url, data, {
        headers: {
            'Content-Type': 'application/json',
            ...headers
        }
    })
}

export function* remove(url, data, headers) {
    return yield call($api.delete, url, data, {
        headers: {
            'Content-Type': 'application/json',
            ...headers
        }
    })
}
