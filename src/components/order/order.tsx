import { FC, memo } from 'react';
import { useParams } from 'react-router-dom';
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
  const { id } = useParams<{ id: string }>();
  const order: any = JSON.parse(localStorage.getItem('orders') as string).find(
    (i: any) => i._id === id
  );

  const status = getOrderStatus(order.status, styleOrder);
  const allIngredients: ITypeIngredient[] = useSelector(
    ingredientSelectors.allIngredients
  );

  const numberOfIngredients = getQuantityIngredients(order.ingredients);

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
        #{order.number}
      </span>
      <h3 className='text text_type_main-medium mb-3'>{order.name}</h3>
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
