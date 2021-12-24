import React, { memo, useEffect } from 'react';
import styleOrderIngredients from './order-ingredients.module.css';
import { CONSTANTS } from '../../utils/constants';
import OrderCardIngredients from '../order-card-ingredients/order-card-ingredients';
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_START,
} from '../../services/actions';
import { wsSelectors } from '../../services/selectors/wc-selectors';
import { useDispatch, useSelector } from '../../services/type/hooks';

const OrderIngredients = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, [dispatch]);

  const  { orders } = useSelector(wsSelectors.wsData);
console.log(new Date(orders[0]?.createdAt).getTimezoneOffset() * -1 / 60)
  return (
    <section className={styleOrderIngredients.section}>
      <h2 className='text text_type_main-large'>
        {CONSTANTS.ORDER_INGREDIENTS.TITLE}
      </h2>
      <ul className={styleOrderIngredients.list}>
        {orders.map((order: any) => {
          return (
            <li key={order._id}>
              <OrderCardIngredients
                number={order.number}
                name={order.name}
                ingredients={order.ingredients}
                createdAt={order.createdAt}
                order={order}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default memo(OrderIngredients);
