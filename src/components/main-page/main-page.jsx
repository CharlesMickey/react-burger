import React from 'react';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import ConstructorBurger from '../burger-constructor/burger-constructor';

import styleMain from './main-page.module.css'

function MainPage({ bun, sauce, main }) {
  return (
    <main className={styleMain.main}>
      <BurgerIngredients bun={bun} main={main} sauce={sauce} />
      <ConstructorBurger bun={bun} main={main} sauce={sauce} />
    </main>
  );
}

export default MainPage;
