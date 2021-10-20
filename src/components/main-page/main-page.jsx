import React, { memo } from 'react';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import ConstructorBurger from '../burger-constructor/burger-constructor';
import PropTypes from 'prop-types';
import { dataPropTypes } from '../../utils/constants';
import styleMain from './main-page.module.css';

function MainPage({
  isLoading,
  onCardClick,
  openIngredientDetails,
  openOrderDetails,
  bun,
  sauce,
  main,
}) {
  return (
    <main className={styleMain.main}>
      <BurgerIngredients
        open={openIngredientDetails}
        onCardClick={onCardClick}
        bun={bun}
        main={main}
        sauce={sauce}
      />
      <ConstructorBurger
      isLoading={isLoading}
        open={openOrderDetails}
      />
    </main>
  );
}

export default memo(MainPage);

MainPage.propTypes = {
  bun: PropTypes.arrayOf(dataPropTypes.isRequired).isRequired,
  sauce: PropTypes.arrayOf(dataPropTypes.isRequired).isRequired,
  main: PropTypes.arrayOf(dataPropTypes.isRequired).isRequired,
  onCardClick: PropTypes.func.isRequired,
  openIngredientDetails: PropTypes.func.isRequired,
  openOrderDetails: PropTypes.func.isRequired,
};
