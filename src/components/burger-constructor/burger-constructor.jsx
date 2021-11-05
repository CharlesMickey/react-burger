import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styleConstructor from './burger-constructor.module.css';
import { BurgerConstructorContext } from '../../contexts/BurgerConstructorContext';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import {
  ADD_INGREDIENT_CONSTRUCTOR,
  INCREASE_INGREDIENTS,
} from '../../services/actions/actions-type';
import { ingredientSelectors } from '../../services/selectors';
import ConstructorIngredient from '../constructor-ingredient/constructor-ingredient';
import { DRAG_CONSTRUCTOR_INGREDIENT } from '../../services/actions';

function ConstructorBurger({ open }) {
  const { bun, ingredient } = useSelector(
    ingredientSelectors.ingredientsConstructor
  );
  const dispatch = useDispatch();

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: 'ingredient-menu',
    drop: (item) => {
      const itemWithId = { ...item, uniqueId: Math.random() };
      dispatch({
        type: ADD_INGREDIENT_CONSTRUCTOR,
        item: itemWithId,
      });
      dispatch({
        type: INCREASE_INGREDIENTS,
        id: itemWithId._id,
        typeForCounter: itemWithId.type,
      });
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const isActive = canDrop && isOver;

  const backgroundColor =
    (isActive && 'rgba(45, 45, 55, 1)') || (canDrop && 'rgba(30, 30, 55, 1)');

  const { getOrderNumber } = React.useContext(BurgerConstructorContext);

  const moveItem = useCallback(
    (dragIndex, hoverIndex) => {
      dispatch({
        type: DRAG_CONSTRUCTOR_INGREDIENT,
        dragIndex: dragIndex,
        hoverIndex: hoverIndex,
      });
    },
    [dispatch]
  );

  function handleClick() {
    const id = ingredient
      .map((item) => {
        return item._id;
      })
      .concat(bun._id);
    open();
    getOrderNumber(id);
  }

  return (
    <section className={styleConstructor.constructor}>
      <div
        ref={drop}
        style={{ backgroundColor }}
        className={styleConstructor.constructorElement}
      >
        {bun && (
          <ConstructorElement
            type='top'
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        )}

        <ul className={styleConstructor.list}>
          {ingredient.map((ingredient, index) => {
            return (
              <ConstructorIngredient
                moveItem={moveItem}
                id={ingredient._id}
                index={index}
                ingredient={ingredient}
                key={ingredient.uniqueId}
              />
            );
          })}
        </ul>
        {bun && (
          <ConstructorElement
            type='bottom'
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        )}
      </div>
      {bun && (
        <div className={styleConstructor.containerButton}>
          <div className='mr-10'>
            <span className='mr-2 text text_type_digits-medium'>
              {bun.price * 2 +
                ingredient.reduce((previousValue, currentValue) => {
                  return previousValue + currentValue.price;
                }, 0)}
            </span>
            <CurrencyIcon type='primary' />
          </div>
          <Button onClick={handleClick} type='primary' size='large'>
            Оформить заказ
          </Button>
        </div>
      )}
    </section>
  );
}

export default ConstructorBurger;

ConstructorBurger.propTypes = {
  open: PropTypes.func.isRequired,
};
