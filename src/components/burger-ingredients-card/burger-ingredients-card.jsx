import React, { memo } from 'react';
import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styleBurgerIngredientsCard from './burger-ingredients-card.module.css';
import { dataPropTypes, QUANTITY_BUNS } from '../../utils/constants';
import { getViewedIngredient } from '../../services/actions/ingredients';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import { ingredientSelectors } from '../../services/selectors';
import { INGREDIENT_DETAILS_OPEN } from '../../services/actions';

function BurgerIngredientsCard({ card }) {
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
    dispatch({ type: INGREDIENT_DETAILS_OPEN });
  }
  return (
    <li
      ref={drag}
      style={{ opacity }}
      onClick={handleCardClick}
      className={`mb-10 ${styleBurgerIngredientsCard.item}`}
    >
      <img src={card.image} alt={card.name} />
      {quantity ? <Counter count={quantity} size='default' /> : null}
      <div className={styleBurgerIngredientsCard.container}>
        <span className='text text_type_digits-default'>{card.price}</span>
        <CurrencyIcon type='primary' />
      </div>
      <p className={`text text_type_main-default`}>{card.name}</p>
    </li>
  );
}

export default memo(BurgerIngredientsCard);

BurgerIngredientsCard.propTypes = {
  card: dataPropTypes.isRequired,
};
