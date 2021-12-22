import React, { FC, memo } from 'react';
import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styleBurgerIngredientsCard from './burger-ingredients-card.module.css';
import { QUANTITY_BUNS } from '../../utils/constants';
import { getViewedIngredient } from '../../services/actions/ingredients';
import { useDispatch, useSelector } from '../../services/type/hooks';
import { useDrag } from 'react-dnd';
import { ingredientSelectors } from '../../services/selectors';
import { Link, useLocation } from 'react-router-dom';
import { ITypeIngredient } from '../../utils/type-constants';
import { TCard } from './type';
import OrderPrice from '../order-price/order-price';

const BurgerIngredientsCard: FC<TCard<ITypeIngredient>> = ({ card }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { counter, bun } = useSelector(
    ingredientSelectors.ingredientsConstructor
  );

  const [{ isDrag }, drag] = useDrag({
    type: 'ingredient-menu',
    item: () => card,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const quantity =
    bun && bun._id === card._id ? QUANTITY_BUNS : counter[card._id];

  const opacity = isDrag ? 0.5 : 1;

  function handleCardClick() {
    dispatch(getViewedIngredient(card));
  }

  return (
    <div
      ref={drag}
      style={{ opacity }}
      onClick={handleCardClick}
      className={`mb-10 `}
    >
      <Link
        className={styleBurgerIngredientsCard.link}
        to={{
          pathname: `/ingredients/${card._id}`,
          state: { background: location },
        }}
      >
        <img src={card.image} alt={card.name} />
        {quantity ? <Counter count={quantity} size='default' /> : null}
        <div className={styleBurgerIngredientsCard.container}>
          <OrderPrice price={card.price} />
        </div>
        <p className={`text text_type_main-default`}>{card.name}</p>
      </Link>
    </div>
  );
};

export default memo(BurgerIngredientsCard);
