import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styleIngredients from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientsCardList from '../burger-ingredients-card-list/burger-ingredients-card-list';
import { dataPropTypes } from '../../utils/constants';

function BurgerIngredients({ bun, sauce, main }) {
  const [current, setCurrent] = React.useState('one');

  return (
    <section className={styleIngredients.section}>
      <h1 className={`text text_type_main-large ${styleIngredients.title}`}>
        Собeрите бургер
      </h1>
      <div className={styleIngredients.tab}>
        <Tab value='one' active={current === 'one'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value='two' active={current === 'two'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value='three' active={current === 'three'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div className={styleIngredients.scroll}>
        <BurgerIngredientsCardList data={bun} title='Булки' />
        <BurgerIngredientsCardList data={sauce} title='Соусы' />
        <BurgerIngredientsCardList data={main} title='Начинки' />
      </div>
    </section>
  );
}

export default memo(BurgerIngredients);

BurgerIngredients.propTypes = {
  bun: PropTypes.arrayOf(dataPropTypes.isRequired).isRequired,
  sauce: PropTypes.arrayOf(dataPropTypes.isRequired).isRequired,
  main: PropTypes.arrayOf(dataPropTypes.isRequired).isRequired,
};
