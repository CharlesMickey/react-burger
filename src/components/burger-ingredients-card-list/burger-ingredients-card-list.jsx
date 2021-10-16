import React from 'react';
import PropTypes from 'prop-types';
import BurgerIngredientsCard from '../burger-ingredients-card/burger-ingredients-card';
import burgerIngredientsCardList from './burger-ingredients-card-list.module.css';
import { dataPropTypes } from '../../utils/constants';

function BurgerIngredientsCardList({onCardClick, open, title, data }) {
  return (
    <section>
      <h2 className='mt-0 text text_type_main-medium'>{title}</h2>
      <ul className={burgerIngredientsCardList.list}>
        {data.map((item) => (
          <BurgerIngredientsCard onCardClick={onCardClick} open={open} key={item._id} card={item} />
        ))}
      </ul>
    </section>
  );
}

export default BurgerIngredientsCardList;

BurgerIngredientsCardList.propTypes = {
  data: PropTypes.arrayOf(dataPropTypes.isRequired).isRequired,
  title: PropTypes.string,
};
