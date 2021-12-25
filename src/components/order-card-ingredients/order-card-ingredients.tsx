import React, { memo, FC } from 'react';
import styleOrderCardIngredients from './order-card-ingredients.module.css';
import { useSelector } from '../../services/type/hooks';
import { ingredientSelectors } from '../../services/selectors';
import {
  getOrderDate,
  getOrderIngredients,
  getOrderPrice,
  getOrderStatus,
} from '../../utils/function';
import { ITypeIngredient } from '../../utils/type-constants';
import OrderTime from '../order-time/order-time';
import OrderPrice from '../order-price/order-price';
import { Link, useLocation } from 'react-router-dom';
import { TOrder } from '../../services/type/socket';

type TOrderCardIngredients = {
  name: string;
  number: number;
  ingredients: Array<string>;
  status?: string;
  order: TOrder;
};

const OrderCardIngredients: FC<TOrderCardIngredients> = ({
  name,
  number,
  ingredients,
  status,
  order,
}) => {
  const location = useLocation();
  const pathName =
    location.pathname === '/feed'
      ? `/feed/${order?._id}`
      : `/profile/orders/${order._id}`;
  const allIngredients: ITypeIngredient[] = useSelector(
    ingredientSelectors.allIngredients
  );
  const orderIngredients = getOrderIngredients(
    ingredients,
    allIngredients
  ).slice(0, 6);
  const countIngredients = ingredients.length - 6;

  const orderStatus = status
    ? getOrderStatus(status, styleOrderCardIngredients)
    : null;

  const price = getOrderPrice(
    getOrderIngredients(order.ingredients, allIngredients)
  );

  const timeOrder = getOrderDate(order);

  return (
    <Link
      className={styleOrderCardIngredients.link}
      to={{ pathname: pathName, state: { background: location } }}
    >
      <section className={styleOrderCardIngredients.section}>
        <div className={styleOrderCardIngredients.orderTime}>
          <span className='text text_type_digits-default'>{`#${number}`}</span>
          <OrderTime time={timeOrder} />
        </div>
        <div className='mb-6'>
          <h3 className='text text_type_main-medium'>{name}</h3>
          {status && (
            <p
              className={`text text_type_main-default mt-2 ${orderStatus?.colorStatus}`}
            >
              {orderStatus?.nameStatus}
            </p>
          )}
        </div>
        <div className={styleOrderCardIngredients.containerOrderImg}>
          <ul className={styleOrderCardIngredients.list}>
            {orderIngredients.map((item: ITypeIngredient, index: number) => {
              const zIndex = 6 - index;
              return (
                <li
                  className={styleOrderCardIngredients.listItem}
                  key={index}
                  style={{ zIndex }}
                >
                  <img
                    src={item.image_large}
                    alt={item.name}
                    className={styleOrderCardIngredients.img}
                  />
                </li>
              );
            })}
            {ingredients.length > 6 && (
              <div className={styleOrderCardIngredients.overlay}>
                {' '}
                <span className='text text_type_main-default'>{`+${countIngredients}`}</span>
              </div>
            )}
          </ul>
          <div className={styleOrderCardIngredients.containerPrice}>
            <OrderPrice price={price} />
          </div>
        </div>
      </section>
    </Link>
  );
};

export default memo(OrderCardIngredients);
