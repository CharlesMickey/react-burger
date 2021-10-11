import React from 'react';
import PropTypes from 'prop-types';
import BurgerIngredientsCard from '../burger-ingredients-card/burger-ingredients-card';
import burgerIngredientsCardList from './burger-ingredients-card-list.module.css';

function BurgerIngredientsCardList({ title, data }) {
  return (
    <section>
      <h2 className='mt-0 text text_type_main-medium'>{title}</h2>
      <ul className={burgerIngredientsCardList.list}>
        {data.map((item) => (
          <BurgerIngredientsCard key={item._id} card={item} />
        ))}
      </ul>
    </section>
  );
}

export default BurgerIngredientsCardList;


BurgerIngredientsCardList.propTypes = {
  title: PropTypes.string
}; 
