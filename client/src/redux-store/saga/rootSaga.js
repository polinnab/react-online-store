import { all, fork } from "redux-saga/effects"
import { productsSaga } from "./productsSaga";
import { categoriesSaga } from "./categoriesSaga";
import { cartSaga } from "./cartSaga";
import { userSaga } from "./userSaga";
import { orderSaga } from "./orderSaga";

const allSagas = [
    fork(categoriesSaga),
    fork(productsSaga),
    fork(cartSaga),
    fork(userSaga),
    fork(orderSaga)
]

export function* rootSaga() {
    yield all(allSagas)
}