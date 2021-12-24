import React, { memo, useEffect } from 'react';
import {
  WS_CONNECTION_CLOSED_AUTH,
  WS_CONNECTION_START_AUTH,
} from '../../services/actions';
import { wsSelectors } from '../../services/selectors/wc-selectors';
import { useDispatch, useSelector } from '../../services/type/hooks';
import OrderCardIngredients from '../order-card-ingredients/order-card-ingredients';
import styleOrdersHistory from './orders-history.module.css';

function OrdersHistory() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START_AUTH });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED_AUTH });
    };
  }, [dispatch]);

  const {orders} = useSelector(wsSelectors.wsDataAuth);
  
  return (
    <section className={styleOrdersHistory.section}>
      <ul className={styleOrdersHistory.list}>
        {orders.reverse().map((order: any) => {
          return (
            <li key={order._id}>
              <OrderCardIngredients
                number={order.number}
                name={order.name}
                ingredients={order.ingredients}
                createdAt={order.createdAt}
                status={order.status}
                order={order}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default memo(OrdersHistory);
