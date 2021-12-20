import React, { memo, FC } from 'react';
import styleOrderIngredients from './order-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { CONSTANTS } from '../../utils/constants';
import OrderCardIngredients from '../order-card-ingredients/order-card-ingredients';

const OrderIngredients = () => {
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
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default memo(OrderIngredients);

export const ordersAll: any = {
  success: true,
  orders: [
    {
      ingredients: [
        '60d3b41abdacab0026a733c6',
        '60d3b41abdacab0026a733c8',
        '60d3b41abdacab0026a733c8',
        '60d3b41abdacab0026a733c8',
        '60d3b41abdacab0026a733c8',
        '60d3b41abdacab0026a733c8',
        '60d3b41abdacab0026a733c8',
      ],
      _id: '1',
      name: 'Супер пУПЕР Бургр',
      status: 'done',
      number: 1,
      createdAt: '2021-06-23T20:11:01.403Z',
      updatedAt: '2021-06-23T20:11:01.406Z',
    },
    {
      ingredients: ['60d3b41abdacab0026a733c6'],
      name: 'Супер  Бургр',
      _id: '2',
      status: 'done',
      number: 3,
      createdAt: '2021-06-23T20:13:23.654Z',
      updatedAt: '2021-06-23T20:13:23.657Z',
    },
    {
      ingredients: ['60d3b41abdacab0026a733c6', '60d3b41abdacab0026a733c8'],
      name: 'пУПЕР Бургр',
      _id: '5',
      status: 'done',
      number: 331,
      createdAt: '2021-06-23T20:11:01.403Z',
      updatedAt: '2021-06-23T20:11:01.406Z',
    },
    {
      ingredients: ['60d3b41abdacab0026a733c6', '60d3b41abdacab0026a733c8'],
      name: 'Бургр',
      _id: '3',
      status: 'done',
      number: 144,
      createdAt: '2021-06-23T20:11:01.403Z',
      updatedAt: '2021-06-23T20:11:01.406Z',
    },
    {
      ingredients: ['60d3b41abdacab0026a733c6', '60d3b41abdacab0026a733c8'],
      name: 'Супер',
      _id: '4',
      status: 'done',
      number: 5551,
      createdAt: '2021-06-23T20:11:01.403Z',
      updatedAt: '2021-06-23T20:11:01.406Z',
    },
  ],
  total: 5,
  totalToday: 2,
};

export const orders = ordersAll.orders;