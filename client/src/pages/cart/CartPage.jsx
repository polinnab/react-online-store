import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cartActions } from '../../redux-store/saga/sagaActions';
import CartTable from '../../components/Cart/CartTable';
import styled from 'styled-components';

const CartPage = () => {
    const dispatch = useDispatch();
    const {products} = useSelector((state) => state.cart);

    useEffect(() => {
        dispatch({ type: cartActions.GET_CART })
    }, [dispatch]);

    return(
        <Container>
            <Header>
                <h1>Cart</h1>
            </Header>

            <CartTable products={products}/>

        </Container>
    )
}

export default CartPage

const Container = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 60%;
`

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
`