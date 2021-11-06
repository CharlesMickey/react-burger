import React, { memo } from 'react';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import ConstructorBurger from '../burger-constructor/burger-constructor';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import styleMain from './main-page.module.css';

function MainPage() {
  return (
    <main className={styleMain.main}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        <ConstructorBurger />
      </DndProvider>
    </main>
  );
}

export default memo(MainPage);
