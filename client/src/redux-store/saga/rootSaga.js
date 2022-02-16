import { all, fork } from "redux-saga/effects"
import { productsSaga } from "./productsSaga";
import { categoriesSaga } from "./categoriesSaga";
import { cartSaga } from "./cartSaga";

const allSagas = [
    fork(categoriesSaga),
    fork(productsSaga),
    fork(cartSaga)
]

export function* rootSaga() {
    yield all(allSagas)
}