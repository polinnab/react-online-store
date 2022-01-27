import { call } from 'redux-saga/effects';
import axios from 'axios';

function* request(url, params) {
  console.log('params', params);
  try {
    const response = yield call(() => {
      return axios(url, {
        ...params,
      }).then((res) => res.data);
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export function* get(url, queryParams = {}, params = {}) {
  const { headers = { 'Content-Type': 'application/json' } } = params;
  const query = new URLSearchParams(queryParams).toString();
  return yield request(`${url}${query ? `?` + query : ''}`, {
    method: 'GET',
    headers,
  });
}

export function* post(url, params = {}) {
  const { headers = { 'Content-Type': 'application/json' }, options } = params;
  return yield request(`${url}`, {
    method: 'POST',
    data: options,
    headers,
  });
}

export function* remove(url, params = {}) {
  const { headers = { 'Content-Type': 'application/json' }, options } = params;

  return yield request(`${url}`, {
    method: 'delete',
    data: options,
    headers,
  });
}

export function* edit(url, params = {}) {
  const { headers = { 'Content-Type': 'application/json' }, options } = params;

  return yield request(`${url}/${options.id}`, {
    method: 'put',
    data: JSON.stringify(options),
    headers,
  });
}
