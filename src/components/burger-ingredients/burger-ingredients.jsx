import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styleIngredients from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientsCardList from '../burger-ingredients-card-list/burger-ingredients-card-list';
import { BurgerConstructorContext } from '../../contexts/BurgerConstructorContext';

function BurgerIngredients({ onCardClick, open }) {
  const { allIngredients } = React.useContext(BurgerConstructorContext);
  const [current, setCurrent] = React.useState('one');

  const bun = React.useMemo(
    () => allIngredients.filter((i) => i.type === 'bun'),
    [allIngredients]
  );

  const main = React.useMemo(
    () => allIngredients.filter((i) => i.type === 'main'),
    [allIngredients]
  );

  const sauce = React.useMemo(
    () => allIngredients.filter((i) => i.type === 'sauce'),
    [allIngredients]
  );

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
        <BurgerIngredientsCardList
          onCardClick={onCardClick}
          open={open}
          data={bun}
          title='Булки'
        />
        <BurgerIngredientsCardList
          onCardClick={onCardClick}
          open={open}
          data={sauce}
          title='Соусы'
        />
        <BurgerIngredientsCardList
          onCardClick={onCardClick}
          open={open}
          data={main}
          title='Начинки'
        />
      </div>
    </section>
  );
}

export default memo(BurgerIngredients);

BurgerIngredients.propTypes = {
  open: PropTypes.func.isRequired,
  onCardClick: PropTypes.func.isRequired,
};
