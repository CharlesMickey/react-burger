import { FC, memo, useEffect } from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_CLOSED_AUTH,
  WS_CONNECTION_START,
  WS_CONNECTION_START_AUTH,
} from '../../services/actions';
import { ingredientSelectors } from '../../services/selectors';
import { wsSelectors } from '../../services/selectors/wc-selectors';
import { useDispatch, useSelector } from '../../services/type/hooks';
import { CONSTANTS } from '../../utils/constants';
import {
  getOrderIngredients,
  getOrderPrice,
  getOrderStatus,
  getQuantityIngredients,
} from '../../utils/function';
import { ITypeIngredient } from '../../utils/type-constants';
import OrderIngredient from '../order-ingredient/order-ingredient';
import OrderPrice from '../order-price/order-price';
import OrderTime from '../order-time/order-time';
import styleOrder from './order.module.css';

export type TOrder = {
  ingredients: Array<string>;
  _id: string;
  name: string;
  status: string;
  number: number;
  createdAt: string;
  updatedAt: string;
};
const Order: FC<any> = () => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const isProfile = !!useRouteMatch(CONSTANTS.PROFILE_ROUTE);

  useEffect(() => {
    dispatch(
      isProfile
        ? { type: WS_CONNECTION_START_AUTH }
        : { type: WS_CONNECTION_START }
    );
    return () => {
      dispatch(
        isProfile
          ? { type: WS_CONNECTION_CLOSED_AUTH }
          : { type: WS_CONNECTION_CLOSED }
      );
    };
  }, [dispatch, isProfile]);


  const { orders } = useSelector(
    isProfile ? wsSelectors.wsDataAuth : wsSelectors.wsData
  );

  const order = orders.find((i: TOrder) => i._id === id) as TOrder;

  const status = getOrderStatus(order.status, styleOrder);
  const allIngredients: ITypeIngredient[] = useSelector(
    ingredientSelectors.allIngredients
  );
  const numberOfIngredients = getQuantityIngredients(order.ingredients);

  const orderIngredients = getOrderIngredients(
    Object.keys(numberOfIngredients),
    allIngredients
  );

  const quantity: Array<number> = Object.values(numberOfIngredients);

  const price = getOrderPrice(
    getOrderIngredients(order.ingredients, allIngredients)
  );

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
        <OrderTime time={order.createdAt}/>
        <OrderPrice price={price} />
      </div>
    </section>
  );
};

export default memo(Order);
