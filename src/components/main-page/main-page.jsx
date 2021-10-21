import React, { memo } from 'react';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import ConstructorBurger from '../burger-constructor/burger-constructor';
import PropTypes from 'prop-types';
import styleMain from './main-page.module.css';

function MainPage({
  isLoading,
  onCardClick,
  openIngredientDetails,
  openOrderDetails,
}) {
  return (
    <main className={styleMain.main}>
      <BurgerIngredients
        open={openIngredientDetails}
        onCardClick={onCardClick}
      />
      <ConstructorBurger isLoading={isLoading} open={openOrderDetails} />
    </main>
  );
}

export default memo(MainPage);

MainPage.propTypes = {
  onCardClick: PropTypes.func.isRequired,
  openIngredientDetails: PropTypes.func.isRequired,
  openOrderDetails: PropTypes.func.isRequired,
};
