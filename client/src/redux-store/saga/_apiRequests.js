import { call } from 'redux-saga/effects';

function* request(url, params) {
  const { headers = {}, ...options } = params;

  try {
    const data = yield call(() => {
      return fetch(url, {
        ...options,
        headers: {
          ...headers,
          Accept: 'application/json',
        },
      }).then((res) => res.json());
    });
    return data;
  } catch (error) {
    console.log(error);
  }
}

export function* get(url, queryParams = {}, params = {}) {
  const { headers = {}, ...options } = params;
  const query = new URLSearchParams(queryParams).toString();
  return yield request(`${url}?${query}`, {
    method: 'GET',
    headers,
    ...options,
  });
}

export function* post(url, params = {}) {
  const { headers = {'Content-Type': 'application/json'}, options } = params;

  return yield request(`${url}`, {
    method: 'POST',
    body: options,
    headers
  });
}


export function* remove(url, params = {}) {
  const { headers = {'Content-Type': 'application/json'}, options } = params;

  return yield request(`${url}`, {
    method: 'delete',
    body: options,
    headers
  });
}


export function* edit(url, params = {}) {
  const { headers = {'Content-Type': 'application/json'}, options } = params;

  return yield request(`${url}/${options.id}`, {
    method: 'put',
    body: JSON.stringify(options),
    headers
  });
}
