import React, { useState, useEffect } from 'react';
import InfoTable from '../InfoTable/InfoTable';
import Dialogs from '../../components/Dialogs';
import { useDispatch, useSelector } from 'react-redux';
import { dialog } from '../../redux-store/slices/dialogSlice';
import { orderActions } from '../../redux-store/saga/sagaActions';

const Orders = ({ type }) => {
  const dispatch = useDispatch();

  const [editOrder, setEditOrder] = useState([]);
  const { orderList, user } = useSelector((state) => state.user);
  const headers = ['Заказы', 'Товары', 'Цена', 'Клиент', 'Статус', 'Действие'];
  console.log('orderList', orderList);

	useEffect(() => {
		dispatch({type: orderActions.GET_ORDERS, id: user.id })
	}, [dispatch])

  const openDialog = (name) => {
    dispatch(
      dialog({
        visible: true,
        name,
      })
    );
  };

  const editElem = (id) => {
    setEditOrder(...orderList.filter((elem) => elem.id === id));
    openDialog('order');
  };

  return (
    <React.Fragment>
			<br/>
      {orderList ? <InfoTable headers={headers} body={orderList} dataType={'Orders'} editElem={editElem} /> : <p style={{ textAlign: 'center' }}>Список заказов пуст</p>}

      <Dialogs readyData={editOrder || null} />
    </React.Fragment>
  );
};

export default Orders;
