import React, { FC, memo } from 'react';
import styleOrderIngredients from './order-ingredients.module.css';
import { CONSTANTS } from '../../utils/constants';
import OrderCardIngredients from '../order-card-ingredients/order-card-ingredients';
import { TOrder } from '../../services/type/socket';

type TOrders = {
  orders: TOrder[]
}

const OrderIngredients: FC<TOrders> = ({orders}) => {
  return (
    orders && <section className={styleOrderIngredients.section}>
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
