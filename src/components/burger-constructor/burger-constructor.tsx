import React, { useCallback, FC } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styleConstructor from './burger-constructor.module.css';
import { useDispatch, useSelector } from '../../services/type/hooks';
import { useDrop } from 'react-dnd';
import {
  ADD_INGREDIENT_CONSTRUCTOR,
  CLEAR_ORDER_NUMBER,
  GET_ORDER_REQUEST,
  INCREASE_INGREDIENTS,
} from '../../services/actions';
import { ingredientSelectors } from '../../services/selectors';
import ConstructorIngredient from '../constructor-ingredient/constructor-ingredient';
import { DRAG_CONSTRUCTOR_INGREDIENT } from '../../services/actions';
import { getOrder } from '../../services/actions/order';
import { useHistory } from 'react-router';
import { TIngredientWithUniqueId } from '../../utils/type-constants';

const ConstructorBurger: FC = () => {
  const history = useHistory();
  const location = useLocation();
  const { bun, ingredient } = useSelector(
    ingredientSelectors.ingredientsConstructor
  );
  const orderRequest = useSelector(ingredientSelectors.orderRequest);
  const refreshToken = localStorage.refreshToken;
  const price = useSelector(ingredientSelectors.price);
  const dispatch = useDispatch();

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: 'ingredient-menu',
    drop: (item: TIngredientWithUniqueId) => {
      dispatch({ type: GET_ORDER_REQUEST });
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
    (isActive && 'rgba(45, 45, 55, 1)') ||
    (canDrop && 'rgba(30, 30, 55, 1)') ||
    '';

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
    dispatch({ type: GET_ORDER_REQUEST });
    let id: string[] = [];
    if (bun !== null) {
      id = ingredient
        .map((item: TIngredientWithUniqueId) => {
          return item._id;
        })
        .concat(bun._id);
    }
    if (refreshToken) {
      history.push({
        pathname: '/',
        state: {
          background: location,
        },
      });
      dispatch(getOrder(id));
      dispatch({ type: CLEAR_ORDER_NUMBER });
    } else {
      history.push('/login');
    }
  }

  return (
    <section className={styleConstructor.section}>
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
          {ingredient.map(
            (ingredient: TIngredientWithUniqueId, index: number) => {
              return (
                <ConstructorIngredient
                  moveItem={moveItem}
                  id={ingredient._id}
                  index={index}
                  ingredient={ingredient}
                  key={ingredient.uniqueId}
                />
              );
            }
          )}
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
          <Button
            disabled={!orderRequest}
            onClick={handleClick}
            type='primary'
            size='large'
          >
            Оформить заказ
          </Button>
        </div>
      )}
    </section>
  );
};

export default ConstructorBurger;
