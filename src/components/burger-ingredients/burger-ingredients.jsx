import React, { memo, useRef } from 'react';
import styleIngredients from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientsCardList from '../burger-ingredients-card-list/burger-ingredients-card-list';
import { useSelector } from 'react-redux';
import { ingredientSelectors } from '../../services/selectors';

function BurgerIngredients() {
  const topRef = useRef(null);
  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);

  const [current, setCurrent] = React.useState('bun');
  const allIngredients = useSelector(ingredientSelectors.allIngredients);

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

  const onScroll = () => {
    const topDistance = topRef.current.getBoundingClientRect().y;
    const bunYDistance = Math.abs(
      topDistance - bunRef.current.getBoundingClientRect().y
    );
    const sauceYDistance = Math.abs(
      topDistance - sauceRef.current.getBoundingClientRect().y
    );
    const mainYDistance = Math.abs(
      topDistance - mainRef.current.getBoundingClientRect().y
    );
    const minTabDistance = Math.min(
      bunYDistance,
      sauceYDistance,
      mainYDistance
    );
    const activeTab =
      minTabDistance === sauceYDistance
        ? 'sauce'
        : minTabDistance === mainYDistance
        ? 'main'
        : 'bun';
    setCurrent(activeTab);
  };

  const handleClick = (current) => {
    if (current === 'bun') bunRef.current.scrollIntoView(true);
    if (current === 'sauce') sauceRef.current.scrollIntoView(true);
    if (current === 'main') mainRef.current.scrollIntoView(true);
  };

  return (
    <section className={styleIngredients.section}>
      <h1 className={`text text_type_main-large ${styleIngredients.title}`}>
        Собeрите бургер
      </h1>
      <div className={styleIngredients.tab}>
        <Tab value='bun' active={current === 'bun'} onClick={handleClick}>
          Булки
        </Tab>
        <Tab value='sauce' active={current === 'sauce'} onClick={handleClick}>
          Соусы
        </Tab>
        <Tab value='main' active={current === 'main'} onClick={handleClick}>
          Начинки
        </Tab>
      </div>
      <div ref={topRef} onScroll={onScroll} className={styleIngredients.scroll}>
        <BurgerIngredientsCardList
          ref={bunRef}
          id='bun'
          data={bun}
          title='Булки'
        />
        <BurgerIngredientsCardList
          ref={sauceRef}
          id='sauce'
          data={sauce}
          title='Соусы'
        />
        <BurgerIngredientsCardList
          ref={mainRef}
          id='main'
          data={main}
          title='Начинки'
        />
      </div>
    </section>
  );
}

export default memo(BurgerIngredients);
