import { cartActions } from './sagaActions';
import { LOCAL_HOST, PORT } from '../../shared/utils/_constans';
import { call, put, takeLatest } from 'redux-saga/effects';
import { getCart } from '../slices/cartSlice';
import axios from 'axios';
import $api from '../../http';

function* getCartProducts(action) {
    try {
        const response = yield call(axios.get, `${LOCAL_HOST}${PORT}/api/cart`, {withCredentials: true});
        yield put(getCart(response.data))
    } catch(e) {
        console.log(e.response)
    }
}

function* emptyCart(action) {
    try {
        yield call($api.delete, `${LOCAL_HOST}${PORT}/api/cart`)
    } catch(e) {
        console.log(e.response)
    }
    yield getCartProducts()
}

function* addProductToCart(action) {
    const product = action.product;
    try {
        yield call($api.post, `${LOCAL_HOST}${PORT}/api/cart/${product.id}`);
    } catch(e) {
        console.log(e.response)
    }
}

function* deleteProductFromCart(action) {
    const product = action.product;

    try {
        const response = yield call($api.delete, `${LOCAL_HOST}${PORT}/api/cart/${product.id}`)
    } catch(e) {
        console.log(e.response)
    }
    yield getCartProducts()
}

function* changeCount(action) {
    const {product, count} = action.payload;

    try {
        const response = yield call($api.put, `${LOCAL_HOST}${PORT}/api/cart/${product.id}`, {count});
        console.log('response in changeCount: ', response)
    } catch(e) {
        console.log(e.response)
        // TODO: handle errors
    }
    yield getCartProducts()
}

export function* cartSaga() {
    yield takeLatest(cartActions.GET_CART, getCartProducts)
    yield takeLatest(cartActions.ADD_TO_CART, addProductToCart)
    yield takeLatest(cartActions.EMPTY_CART, emptyCart)
    yield takeLatest(cartActions.REMOVE_FROM_CART, deleteProductFromCart)
    yield takeLatest(cartActions.CHANGE_COUNT, changeCount)
}