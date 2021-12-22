import React, { memo, FC } from 'react';
import style from './orders-board.module.css';
import { CONSTANTS } from '../../utils/constants';

const OrdersBoard = () => {
  return (
    <section className={style.section}>
      <div className={style.boardContainer}>
        <div className='mr-9'>
          <h3 className='text text_type_main-medium mb-6'>
            {CONSTANTS.ORDER_BOARD.READY}
          </h3>
          <ul className={style.list}>
            {arrNum.map((item, index) => {
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
            {arrGot.map((item, index) => {
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
          28 752
        </span>
      </div>
      <div>
        <h3 className='text text_type_main-medium'>
          {CONSTANTS.ORDER_BOARD.TODAY}
        </h3>
        <span className={`text text_type_digits-large ${style.numberOrder}`}>
          134
        </span>
      </div>
    </section>
  );
};

export default memo(OrdersBoard);

export const arrNum: number[] = [
  9723, 9568, 5846, 5874, 9856, 4521, 9852, 6587, 1426, 9723, 9568, 5846, 5874,
  9856, 4521, 9852, 6587, 1426, 9723, 9568, 5846, 5874, 9856, 4521, 9852, 6587,
  1426,
];

export const arrGot: number[] = [9723, 9568, 5846, 5874];
