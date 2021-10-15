import React, { memo } from 'react';

import AppHeader from '../app-header/app-header';
import * as api from '../../utils/api';
import MainPage from '../main-page/main-page';
import styleApp from './app.module.css';

function App() {
  const [allIngredients, setAllIngredients] = React.useState([]);

  React.useLayoutEffect(() => {
    api
      .getData()
      .then((res) => {
        console.log(res.data);
        return setAllIngredients(res.data);
      })
      .catch((err) => console.log(`${err}`));
  }, []);

  const bun = allIngredients.filter((i) => i.type === 'bun');
  const main = allIngredients.filter((i) => i.type === 'main');
  const sauce = allIngredients.filter((i) => i.type === 'sauce');

  return (
    <div className={styleApp.app}>
      <AppHeader />
      <MainPage bun={bun} main={main} sauce={sauce} />
    </div>
  );
}

export default memo(App);
