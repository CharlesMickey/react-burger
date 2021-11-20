import React, { useCallback } from 'react';
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styleConstructor from './burger-constructor.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import {
  ADD_INGREDIENT_CONSTRUCTOR,
  INCREASE_INGREDIENTS,
  ORDER_DETAILS_OPEN,
} from '../../services/actions';
import { ingredientSelectors } from '../../services/selectors';
import ConstructorIngredient from '../constructor-ingredient/constructor-ingredient';
import { DRAG_CONSTRUCTOR_INGREDIENT } from '../../services/actions';
import { getOrder } from '../../services/actions/order';
import { useHistory } from 'react-router';

function ConstructorBurger() {
  const history = useHistory();
  const { bun, ingredient } = useSelector(
    ingredientSelectors.ingredientsConstructor
  );
  const refreshToken = localStorage.refreshToken;
  const price = useSelector(ingredientSelectors.price);
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
    if (refreshToken) {
      dispatch({ type: ORDER_DETAILS_OPEN });
      dispatch(getOrder(id));
    } else {
      history.push('/login');
    }
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
            <span className='mr-2 text text_type_digits-medium'>{price}</span>
            <CurrencyIcon type='primary' />
          </div>
          <Button onClick={handleClick} type='primary' size='large'>
            Оформить заказ
          </Button>
          )
        </div>
      )}
    </section>
  );
}

export default ConstructorBurger;
