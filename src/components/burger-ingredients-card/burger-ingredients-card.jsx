import React, { memo } from 'react';
import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styleBurgerIngredientsCard from './burger-ingredients-card.module.css';
import { dataPropTypes } from '../../utils/constants';

function BurgerIngredientsCard({ card }) {
  return (
    <li className={`mb-10 ${styleBurgerIngredientsCard.item}`}>
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
};
