import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styleBurgerIngredientsCard from './burger-ingredients-card.module.css';
import { dataPropTypes } from '../../utils/constants';
import { getViewedIngredient } from '../../services/actions/ingredients';
import { useDispatch } from 'react-redux';

function BurgerIngredientsCard({  open, card }) {
  const dispatch = useDispatch();
  
  function handleCardClick() {
    dispatch(getViewedIngredient(card));
    open();
  }
  return (
    <li
      onClick={handleCardClick}
      className={`mb-10 ${styleBurgerIngredientsCard.item}`}
    >
      <img src={card.image} alt={card.name} />
      <Counter count={1} size='default' />
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
  open: PropTypes.func.isRequired,
};
