import React, { useState, useEffect } from 'react';
import InfoTable from '../InfoTable/InfoTable';
import Dialogs from '../../components/Dialogs';
import { useDispatch, useSelector } from 'react-redux';
import { dialog } from '../../redux-store/slices/dialogSlice';
import { orderActions } from '../../redux-store/saga/sagaActions';

const Orders = ({type}) => {
  const dispatch = useDispatch();
  const [editOrder, setEditOrder] = useState([]);
  const { user } = useSelector((state) => state.user);
  const { orderList } = useSelector((state) => state.order);
  const headers = ['Заказы', 'Товары', 'Цена', 'Клиент', 'Статус', 'Действие'];

  if (type === 'History' && user.role === 'User') {
    headers.pop()
  }

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

  const filtredOrders = orderList.map(elem => {
    if (type === 'Orders' && elem.status === 'in_progress') {
      return elem
    } else if (type !== 'Orders' && elem.status !== 'in_progress') {
      return elem
    }
  }).filter(elem => elem);

  return (
    <React.Fragment>
			<br/>
      {filtredOrders.length ? <InfoTable headers={headers} body={filtredOrders} dataType={type} editElem={(type ==='History' && user.role === 'User') ? '' : editElem} /> : <p style={{ textAlign: 'center' }}>Список пуст</p>}

      <Dialogs readyData={editOrder || null} />
    </React.Fragment>
  );
};

export default Orders;
