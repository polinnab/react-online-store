import { all, fork } from "redux-saga/effects"
import { productsSaga } from "./productsSaga";

const allSagas = [
    fork(productsSaga)
]

export function* rootSaga() {
    yield all(allSagas)
}