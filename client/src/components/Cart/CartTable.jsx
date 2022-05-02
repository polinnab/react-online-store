import React, { useCallback } from "react";
import { Paper } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useDispatch } from "react-redux";
import { cartActions } from "../../redux-store/saga/sagaActions";
import { IMAGE_URL } from "../../shared/utils/_constans";
import { moneyFormatter } from "../../shared/utils/_methods";

export default function CartTable({products}) {
    const dispatch = useDispatch();

    const minusProduct = (product) => {
        const payload = {
            product: product,
            count: product.count - 1
        }
        dispatch({type: cartActions.CHANGE_COUNT, payload})
    };

    const plusProduct = (product) => {
        const payload = {
            product: product,
            count: product.count + 1
        }
        dispatch({type: cartActions.CHANGE_COUNT, payload})
    };

    const calculateTotalAmount = useCallback(() => {
        let value = 0;
        products.forEach(product => value = value + Number(product.count) * Number(product.price));
        value = moneyFormatter(value);
        return value
    }, [products]);

    return(
        <>
        <button 
                disabled={!products.length}
                className='btn btn-secondary' 
                onClick={() => dispatch({ type: cartActions.EMPTY_CART })}>
            Empty Cart
        </button>

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
                     sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                     <TableCell component="th" scope="row">
                        <img src={IMAGE_URL + product.image} 
                            alt={product.name} 
                            className='card-img-top' 
                            style={{width: '100px'}}/>
                     </TableCell>
                     <TableCell align="left">
                         {product.name}
                         <p>${moneyFormatter(product.price)}</p>
                        </TableCell>
                     <TableCell align="left">
                        <button onClick={() => minusProduct(product)}
                            disabled={product.count <= 1} 
                            className='Cart_count-minus'>-</button> 
                        <span className='Cart_count-text' >{product.count}</span>
                        <button onClick={() => plusProduct(product)}
                            className='Cart_count-plus'>+</button>
                    </TableCell>
                     <TableCell>
                        <DeleteForeverIcon 
                            onClick={() => dispatch({type: cartActions.REMOVE_FROM_CART, payload: product })} 
                            style={{cursor: 'pointer'}}/>
                    </TableCell>

                   </TableRow>
                 ))} 
               </TableBody>
            </Table>

            <p className='Cart_totalamount'>Total amount: ${calculateTotalAmount()}</p>
        </TableContainer>
        </>
    )
}