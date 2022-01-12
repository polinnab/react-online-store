import {call} from "redux-saga/effects"

function* request(url, params) {
    const { headers = {}, ...options } = params;

  try {
    const data = yield call(() => {
      return fetch(url, {
                ...options,
                headers: {
                  ...headers,
                  Accept: "application/json",
                }})
              .then(res => res.json())
      }
    );
    return data
  } catch (error) {
    console.log(error)
  }
}


export function* get(url, queryParams = {}, params = {}) {
    const { headers = {}, ...options } = params;
    const query = new URLSearchParams(queryParams).toString()
    
  
    return yield request(`${url}?${query}`, {
      method: "GET",
      headers,
      ...options
    });
}

