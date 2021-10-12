import React, { memo } from 'react';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import ConstructorBurger from '../burger-constructor/burger-constructor';
import PropTypes from 'prop-types';
import { dataPropTypes } from '../../utils/data';
import styleMain from './main-page.module.css';

function MainPage({ bun, sauce, main }) {
  return (
    <main className={styleMain.main}>
      <BurgerIngredients bun={bun} main={main} sauce={sauce} />
      <ConstructorBurger bun={bun} main={main} sauce={sauce} />
    </main>
  );
}

export default memo(MainPage)

BurgerIngredients.propTypes = {
  bun: PropTypes.arrayOf(dataPropTypes.isRequired).isRequired,
  sauce: PropTypes.arrayOf(dataPropTypes.isRequired).isRequired,
  main: PropTypes.arrayOf(dataPropTypes.isRequired).isRequired,
};
