import React from 'react';

import AppHeader from '../app-header/app-header';

import './app.css';

import { data } from '../../utils/data';

import MainPage from '../main-page/main-page';

function App() {
  const bun = data.filter((i) => i.type === 'bun');
  const main = data.filter((i) => i.type === 'main');
  const sauce = data.filter((i) => i.type === 'sauce');
  return (
    <div className='app'>
      <AppHeader />
      <MainPage bun={bun} main={main} sauce={sauce} />
    </div>
  );
}

export default App;
