import { FC, memo } from 'react';
import { ingredientSelectors } from '../../services/selectors';
import { useSelector } from '../../services/type/hooks';
import { CONSTANTS } from '../../utils/constants';
import {
  getOrderIngredients,
  getOrderStatus,
  getQuantityIngredients,
} from '../../utils/function';
import { ITypeIngredient } from '../../utils/type-constants';
import OrderIngredient from '../order-ingredient/order-ingredient';
import OrderPrice from '../order-price/order-price';
import OrderTime from '../order-time/order-time';
import styleOrder from './order.module.css';

const Order: FC<any> = () => {
  const status = getOrderStatus(orders.status, styleOrder);
  const allIngredients: ITypeIngredient[] = useSelector(
    ingredientSelectors.allIngredients
  );

  const numberOfIngredients = getQuantityIngredients(orders.ingredients);

  const orderIngredients = getOrderIngredients(
    Object.keys(numberOfIngredients),
    allIngredients
  );

  const quantity = Object.values(numberOfIngredients);

  return (
    <section className={styleOrder.section}>
      <span
        className={`text text_type_digits-default mb-10 ${styleOrder.orderNumber}`}
      >
        #{orders.number}
      </span>
      <h3 className='text text_type_main-medium mb-3'>{orders.name}</h3>
      <span
        className={`text text_type_main-default mb-8 ${status.colorStatus}`}
      >
        {status.nameStatus}
      </span>
      <p className='text text_type_main-medium mb-4'>
        {CONSTANTS.ORDER.STRUCTURE}
      </p>
      <ul className={styleOrder.list}>
        {orderIngredients.map((ingredient: ITypeIngredient, index: number) => {
          return (
            <li key={index}>
              <OrderIngredient
                ingredient={ingredient}
                quantity={quantity[index]}
              />
            </li>
          );
        })}
      </ul>
      <div className={styleOrder.totalPrice}>
        <OrderTime />
        <OrderPrice price={'5'} />
      </div>
    </section>
  );
};

export default memo(Order);

export const orders = {
  ingredients: [
    '60d3b41abdacab0026a733c7',
    '60d3b41abdacab0026a733d2',
    '60d3b41abdacab0026a733d4',
    '60d3b41abdacab0026a733cd',
    '60d3b41abdacab0026a733c8',
    '60d3b41abdacab0026a733ca',
    '60d3b41abdacab0026a733c8',
  ],
  _id: '1',
  name: 'Black Hole Singularity острый бургер',
  status: 'done',
  number: 89961,
  createdAt: '2021-06-23T20:11:01.403Z',
  updatedAt: '2021-06-23T20:11:01.406Z',
};
