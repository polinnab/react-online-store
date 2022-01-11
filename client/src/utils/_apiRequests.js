import axios from "axios";

export function get(url, queryParam) {
    axios.get(`${url}?${new URLSearchParams(queryParam).toString()}`)
    .then(response => {
        return response.data
    })
}

export function put(url, data, queryParam) {
    axios.put(`${url}?${new URLSearchParams(queryParam).toString()}`)
}