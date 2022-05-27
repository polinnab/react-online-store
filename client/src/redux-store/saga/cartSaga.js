import { cartActions } from './sagaActions';
import { put, takeLatest } from 'redux-saga/effects';
import { getCart } from '../slices/cartSlice';
import { get, post, remove, edit } from '../../http';

function* getCartProducts(action) {
    try {
        const response = yield get('/cart');
        yield put(getCart(response.data))
    } catch(e) {
        console.log(e.response)
    }
}

function* emptyCart(action) {
    try {
        yield remove(`/cart`)
    } catch(e) {
        console.log(e.response)
    }
    yield getCartProducts()
}

function* addProductToCart(action) {
    const product = action.payload;
    try {
        yield post(`/cart/${product.id}`);
    } catch(e) {
        console.log(e.response)
    }
}

function* deleteProductFromCart(action) {
    const product = action.payload;

    try {
        yield remove(`/cart/${product.id}`);
    } catch(e) {
        console.log(e.response)
    }
    yield getCartProducts()
}

function* changeCount(action) {
    const {product, count} = action.payload;

    try {
        yield edit(`/cart/${product.id}`, {count});
    } catch(e) {
        console.log(e.response)
    }
    yield getCartProducts()
}

export function* cartSaga() {
    yield takeLatest(cartActions.GET_CART, getCartProducts);
    yield takeLatest(cartActions.ADD_TO_CART, addProductToCart);
    yield takeLatest(cartActions.EMPTY_CART, emptyCart);
    yield takeLatest(cartActions.REMOVE_FROM_CART, deleteProductFromCart);
    yield takeLatest(cartActions.CHANGE_COUNT, changeCount);
}