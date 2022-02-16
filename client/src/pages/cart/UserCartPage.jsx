import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cartActions } from '../../redux-store/saga/sagaActions';
import { IMAGE_URL } from '../../shared/utils/_constans';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import './userCart.scss';

const UserCartPage = () => {

    const dispatch = useDispatch();
    const products = useSelector((state) => state.cart.cart);

    useEffect(() => {
        dispatch({ type: cartActions.GET_CART })
    }, [dispatch]);

    const emptyCart = () => {
        dispatch({ type: cartActions.EMPTY_CART })
    }

    const deleteProduct = (product) => {
        dispatch({type: cartActions.REMOVE_FROM_CART, product: product })
    }

    const minusProduct = (product) => {
        const payload = {
            product: product,
            count: product.count - 1
        }
        dispatch({type: cartActions.CHANGE_COUNT, payload})
    }

    const plusProduct = (product) => {
        const payload = {
            product: product,
            count: product.count + 1
        }
        dispatch({type: cartActions.CHANGE_COUNT, payload})
    }

    return(
        <div className='Cart_container'>
            <div className='Cart_header'>
                <h1>Cart</h1>
                <button 
                    className='btn btn-secondary' 
                    onClick={() => emptyCart()}>
                Empty Cart
                </button>
            </div>

                {products.length ? 
                 <TableContainer component={Paper}>
                 <Table sx={{ minWidth: 650 }} aria-label="simple table">
                   <TableHead>
                     <TableRow>
                       <TableCell></TableCell>
                       <TableCell align="left">Name</TableCell>
                       <TableCell align="left">Count</TableCell>
                       <TableCell></TableCell>
                     </TableRow>
                   </TableHead>
                   <TableBody>
                     {products.map((product) => (
                       <TableRow
                         key={product.id}
                         sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                       >
                         <TableCell component="th" scope="row">
                            <img 
                                src={IMAGE_URL + product.image} 
                                alt={product.name} 
                                className='card-img-top' 
                                style={{width: '100px'}}/>
                         </TableCell>
                         <TableCell align="left">{product.name}</TableCell>
                         <TableCell align="left">
                            <button 
                                disabled={product.count <= 1} 
                                className='Cart_count-minus'
                                onClick={() => minusProduct(product)}>
                            -</button> 
                            <span className='Cart_count-text' >{product.count}</span>
                            <button 
                                className='Cart_count-plus'
                                onClick={() => plusProduct(product)}>
                            +</button>
                        </TableCell>
                         <TableCell>
                            <DeleteForeverIcon 
                                onClick={() => deleteProduct(product)} 
                                style={{cursor: 'pointer'}}/>
                        </TableCell>
 
                       </TableRow>
                     ))} 
                   </TableBody>
                 </Table>
                 </TableContainer>
                : <h3>The cart is empty</h3>}

        </div>
    )
}

export default UserCartPage