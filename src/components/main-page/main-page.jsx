import React, { memo } from 'react';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import ConstructorBurger from '../burger-constructor/burger-constructor';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import PropTypes from 'prop-types';
import styleMain from './main-page.module.css';

function MainPage({ openIngredientDetails, openOrderDetails }) {
  return (
    <main className={styleMain.main}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients open={openIngredientDetails} />
        <ConstructorBurger open={openOrderDetails} />
      </DndProvider>
    </main>
  );
}

export default memo(MainPage);

MainPage.propTypes = {
  openIngredientDetails: PropTypes.func.isRequired,
  openOrderDetails: PropTypes.func.isRequired,
};
