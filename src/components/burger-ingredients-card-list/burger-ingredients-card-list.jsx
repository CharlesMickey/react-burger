import React, { forwardRef, memo } from 'react';
import PropTypes from 'prop-types';
import BurgerIngredientsCard from '../burger-ingredients-card/burger-ingredients-card';
import burgerIngredientsCardList from './burger-ingredients-card-list.module.css';
import { dataPropTypes } from '../../utils/constants';

const BurgerIngredientsCardList = forwardRef(({ title, data }, ref) => {
  return (
    <section ref={ref}>
      <h2 className='mt-0 text text_type_main-medium'>{title}</h2>
      <ul className={burgerIngredientsCardList.list}>
        {data.map((item) => (
          <BurgerIngredientsCard key={item._id} card={item} />
        ))}
      </ul>
    </section>
  );
});

export default memo(BurgerIngredientsCardList);

BurgerIngredientsCardList.propTypes = {
  data: PropTypes.arrayOf(dataPropTypes.isRequired).isRequired,
  title: PropTypes.string,
};
