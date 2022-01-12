import { get } from "./_apiRequests"
import { LOCAL_HOST, PORT } from "../../shared/utils/_constans"
import { all, put } from "redux-saga/effects"
import { getProductsAction } from "../redux-actions/productsActions"



function* fetchProductsListWorker(action) {
    // add loader

    const data = yield get(`${LOCAL_HOST}${PORT}/api/products`)

    yield put(getProductsAction(data))
}

export function* productsSaga() {
    yield all([fetchProductsListWorker()])
}