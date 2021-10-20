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

function ConstructorBurger({ isLoading, open }) {
  const ingredients = React.useContext(BurgerConstructorContext);

  const bun = React.useMemo(
    () => ingredients.find((item) => item.type === 'bun'),
    [ingredients]
  );

  const otherIngredients = React.useMemo(
    () => ingredients.filter((item) => item.type !== 'bun'),
    [ingredients]
  );

  return isLoading ? (
    ''
  ) : (
    <section className={styleConstructor.constructor}>
      <div className={styleConstructor.constructorElement}>
        <ConstructorElement
          type='top'
          isLocked={true}
          text={`${bun.name} (верх)`}
          price={bun.price || ''}
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
        <Button onClick={open} type='primary' size='large'>
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

export default ConstructorBurger;

ConstructorBurger.propTypes = {
  open: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
