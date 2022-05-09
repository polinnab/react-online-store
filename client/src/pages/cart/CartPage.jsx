import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cartActions } from '../../redux-store/saga/sagaActions';
import CartTable from '../../components/Cart/CartTable';

import './cart.scss';

const CartPage = () => {
    const dispatch = useDispatch();
    const {products} = useSelector((state) => state.cart);

    useEffect(() => {
        dispatch({ type: cartActions.GET_CART })
    }, [dispatch]);

    return(
        <div className='Cart_container'>
            <div className='Cart_header'>
                <h1>Cart</h1>
            </div>

            <CartTable products={products}/>

        </div>
    )
}

export default CartPage