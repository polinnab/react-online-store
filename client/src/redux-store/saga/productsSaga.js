import { get } from "./_apiRequests"
import { LOCAL_HOST, PORT } from "../../shared/utils/_constans"
import { all, put } from "redux-saga/effects"
import { getProducts } from "../slices/productSlice"

function* fetchProductsListWorker(action) {
    // add loader

    const data = yield get(`${LOCAL_HOST}${PORT}/api/products`)

    yield put(getProducts(data))
}

export function* productsSaga() {
    yield all([fetchProductsListWorker()])
}