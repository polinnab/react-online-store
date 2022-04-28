import { all, fork } from "redux-saga/effects"
import { productsSaga } from "./productsSaga";
import { categoriesSaga } from "./categoriesSaga";
import { cartSaga } from "./cartSaga";
import { userSaga } from "./userSaga";
import { orderSaga } from "./orderSaga";
import { loginWatcher } from "./loginSaga";

const allSagas = [
    fork(categoriesSaga),
    fork(productsSaga),
    fork(cartSaga),
    fork(userSaga),
    fork(orderSaga),
    fork(loginWatcher)
]

export function* rootSaga() {
    yield all(allSagas)
}