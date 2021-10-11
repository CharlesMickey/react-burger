import React from 'react';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import './app.css';

import { data } from '../../utils/data';
import ConstructorBurger from '../burger-constructor/burger-constructor';

function App() {
  const bun = data.filter((i) => i.type === 'bun');
  const main = data.filter((i) => i.type === 'main');
  const sauce = data.filter((i) => i.type === 'sauce');
  return (
    <div className='app'>
      <AppHeader />
      <BurgerIngredients bun={bun} main={main} sauce={sauce} />
      <ConstructorBurger bun={bun} main={main} sauce={sauce} />
    </div>
  );
}

export default App;
