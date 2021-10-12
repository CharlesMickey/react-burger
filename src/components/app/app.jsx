import React, { memo } from 'react';

import AppHeader from '../app-header/app-header';
import { data } from '../../utils/data';

import MainPage from '../main-page/main-page';
import styleApp from './app.module.css';

const  App = () => {
  const bun = data.filter((i) => i.type === 'bun');
  const main = data.filter((i) => i.type === 'main');
  const sauce = data.filter((i) => i.type === 'sauce');
  return (
    <div className={styleApp.app}>
      <AppHeader />
      <MainPage bun={bun} main={main} sauce={sauce} />
    </div>
  );
}

export default memo(App)
