import { cartActions } from './sagaActions';
import { LOCAL_HOST, PORT } from '../../shared/utils/_constans';
import { post, get, remove, edit } from './_apiRequests';
import { put, takeEvery } from 'redux-saga/effects';
import { getCart } from '../slices/cartSlice';

function* getCartProducts(action) {
    const data = yield get(`${LOCAL_HOST}${PORT}/api/cart`)
    yield put(getCart(data))
}

function* emptyCart(action) {
    yield remove(`${LOCAL_HOST}${PORT}/api/cart`)
    yield getCartProducts()
}

function* addProductToCart(action) {
    const option = {
        product: action.product
    }
    yield post(`${LOCAL_HOST}${PORT}/api/cart/${option.product.id}`)
}

function* deleteProductFromCart(action) {
    const option = {
        product: action.product
    }
    yield remove(`${LOCAL_HOST}${PORT}/api/cart/${option.product.id}`)
    yield getCartProducts()
}

function* changeCount(action) {
    const option = {
        id: action.payload.product.id,
        count: action.payload.count
    }
    yield edit(`${LOCAL_HOST}${PORT}/api/cart`, { options: option })
    yield getCartProducts()
}

export function* cartSaga() {
    yield takeEvery(cartActions.GET_CART, getCartProducts)
    yield takeEvery(cartActions.ADD_TO_CART, addProductToCart)
    yield takeEvery(cartActions.EMPTY_CART, emptyCart)
    yield takeEvery(cartActions.REMOVE_FROM_CART, deleteProductFromCart)
    yield takeEvery(cartActions.CHANGE_COUNT, changeCount)
}