import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { dataPropTypes } from '../../utils/data';

import styleConstructor from './burger-constructor.module.css';

function ConstructorBurger({ bun, sauce, main }) {
  return (
    <section className={styleConstructor.constructor}>
      <div className={styleConstructor.constructorElement}>
        <ConstructorElement
          type='top'
          isLocked={true}
          text='Краторная булка N-200i (верх)'
          price={200}
          thumbnail={bun[0].image}
        />
        <ul className={styleConstructor.list}>
          <li className={styleConstructor.listItem}>
            <div className={styleConstructor.dragIcon}>
              <DragIcon type='primary' />
            </div>
            <ConstructorElement
              text='Краторная булка N-200i (верх)'
              price={50}
              thumbnail={sauce[0].image}
            />
          </li>
          <li className={styleConstructor.listItem}>
            <div className={styleConstructor.dragIcon}>
              <DragIcon type='primary' />
            </div>
            <ConstructorElement
              text='Краторная булка N-200i (верх)'
              price={50}
              thumbnail={main[0].image}
            />
          </li>
          <li className={styleConstructor.listItem}>
            <div className={styleConstructor.dragIcon}>
              <DragIcon type='primary' />
            </div>
            <ConstructorElement
              text='Краторная булка N-200i (верх)'
              price={50}
              thumbnail={main[2].image}
            />
          </li>
          <li className={styleConstructor.listItem}>
            <div className={styleConstructor.dragIcon}>
              <DragIcon type='primary' />
            </div>
            <ConstructorElement
              text='Краторная булка N-200i (верх)'
              price={50}
              thumbnail={sauce[3].image}
            />
          </li>
          <li className={styleConstructor.listItem}>
            <div className={styleConstructor.dragIcon}>
              <DragIcon type='primary' />
            </div>
            <ConstructorElement
              text='Краторная булка N-200i (верх)'
              price={50}
              thumbnail={sauce[2].image}
            />
          </li>
          <li className={styleConstructor.listItem}>
            <div className={styleConstructor.dragIcon}>
              <DragIcon type='primary' />
            </div>
            <ConstructorElement
              text='Краторная булка N-200i (верх)'
              price={50}
              thumbnail={main[4].image}
            />
          </li>
        </ul>
        <ConstructorElement
          type='bottom'
          isLocked={true}
          text='Краторная булка N-200i (низ)'
          price={200}
          thumbnail={bun[0].image}
        />
      </div>
      <div className={styleConstructor.containerButton}>
        <div className='mr-10'>
          <span className='mr-2 text text_type_digits-medium'>610</span>
          <CurrencyIcon type='primary' />
        </div>
        <Button type='primary' size='large'>
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

export default ConstructorBurger;

ConstructorBurger.propTypes = {
  bun: PropTypes.arrayOf(dataPropTypes.isRequired).isRequired,
  sauce: PropTypes.arrayOf(dataPropTypes.isRequired).isRequired,
  main: PropTypes.arrayOf(dataPropTypes.isRequired).isRequired,
};
