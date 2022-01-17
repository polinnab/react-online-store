import { all, fork } from "redux-saga/effects"
import { productsSaga } from "./productsSaga";
import { categoriesSaga } from "./categoriesSaga";

const allSagas = [
    fork(categoriesSaga),
    fork(productsSaga)
]

export function* rootSaga() {
    yield all(allSagas)
}