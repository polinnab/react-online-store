import { all, fork } from "redux-saga/effects"
import { productsSaga } from "./productsSaga";
import { categoriesSaga } from "./categoriesSaga";
import { cartSaga } from "./cartSaga";
import { userSaga } from "./userSaga";

const allSagas = [
    fork(categoriesSaga),
    fork(productsSaga),
    fork(cartSaga),
    fork(userSaga)
]

export function* rootSaga() {
    yield all(allSagas)
}