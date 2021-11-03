import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styleConstructor from './burger-constructor.module.css';
import { BurgerConstructorContext } from '../../contexts/BurgerConstructorContext';
import { useSelector } from 'react-redux';

function ConstructorBurger({  open }) {
  const  allIngredients  = useSelector((state) => state.ingredients.allIngredients);
  const {  getOrderNumber } = React.useContext(
    BurgerConstructorContext
  );


  const bun = React.useMemo(
    () =>
      allIngredients.find((item) => {
        return item.type === 'bun';
      }),
    [allIngredients]
  );

  const otherIngredients = React.useMemo(
    () => allIngredients.filter((item) => item.type !== 'bun'),
    [allIngredients]
  );

  function handleClick() {
    const id = otherIngredients
      .map((item) => {
        return item._id;
      })
      .concat(bun._id);
    open();
    getOrderNumber(id);
  }

  return allIngredients.length === 0 ? (
    ''
  ) : (
    <section className={styleConstructor.constructor}>
      <div className={styleConstructor.constructorElement}>
        <ConstructorElement
          type='top'
          isLocked={true}
          text={`${bun.name} (верх)`}
          price={bun.price}
          thumbnail={bun.image}
        />

        <ul className={styleConstructor.list}>
          {otherIngredients.map((ingredient) => {
            return (
              <li key={ingredient._id} className={styleConstructor.listItem}>
                <div className={styleConstructor.dragIcon}>
                  <DragIcon type='primary' />
                </div>
                <ConstructorElement
                  text={ingredient.name}
                  price={ingredient.price}
                  thumbnail={ingredient.image}
                />
              </li>
            );
          })}
        </ul>
        <ConstructorElement
          type='bottom'
          isLocked={true}
          text={`${bun.name} (низ)`}
          price={bun.price}
          thumbnail={bun.image}
        />
      </div>
      <div className={styleConstructor.containerButton}>
        <div className='mr-10'>
          <span className='mr-2 text text_type_digits-medium'>
            {bun.price * 2 +
              otherIngredients.reduce((previousValue, currentValue) => {
                return previousValue + currentValue.price;
              }, 0)}
          </span>
          <CurrencyIcon type='primary' />
        </div>
        <Button onClick={handleClick} type='primary' size='large'>
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

export default ConstructorBurger;

ConstructorBurger.propTypes = {
  open: PropTypes.func.isRequired,
};
