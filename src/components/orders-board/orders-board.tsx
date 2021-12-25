import React, { FC, memo } from 'react';
import style from './orders-board.module.css';
import { CONSTANTS } from '../../utils/constants';
import { TWSData } from '../../services/type/socket';
import { getOrderNumbers } from '../../utils/function';

type TOrders = {
  data: TWSData;
};

const OrdersBoard: FC<TOrders> = ({ data }) => {
  const { orders } = data;
  const { done, pending } = getOrderNumbers(orders);

  return (
    <section className={style.section}>
      <div className={style.boardContainer}>
        <div className='mr-9'>
          <h3 className='text text_type_main-medium mb-6'>
            {CONSTANTS.ORDER_BOARD.READY}
          </h3>
          <ul className={style.list}>
            {done.map((item: number, index: number) => {
              return (
                <li
                  key={index}
                  className={`text text_type_digits-default ${style.listItem}`}
                >
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <h3 className='text text_type_main-medium mb-6'>
            {CONSTANTS.ORDER_BOARD.PREPARING}
          </h3>
          <ul className={style.list}>
            {pending.map((item: number, index: number) => {
              return (
                <li key={index} className={`text text_type_digits-default`}>
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className='mt-15 mb-15'>
        <h3 className='text text_type_main-medium'>
          {CONSTANTS.ORDER_BOARD.ALL_TIME}
        </h3>
        <span className={`text text_type_digits-large ${style.numberOrder}`}>
          {data.total}
        </span>
      </div>
      <div>
        <h3 className='text text_type_main-medium'>
          {CONSTANTS.ORDER_BOARD.TODAY}
        </h3>
        <span className={`text text_type_digits-large ${style.numberOrder}`}>
          {data.totalToday}
        </span>
      </div>
    </section>
  );
};

export default memo(OrdersBoard);
