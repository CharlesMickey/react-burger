import React, { memo, useEffect, useRef } from 'react';
import styleIngredients from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientsCardList from '../burger-ingredients-card-list/burger-ingredients-card-list';
import { useDispatch, useSelector } from 'react-redux';
import { getItems } from '../../services/actions/ingredients';
import { ingredientSelectors } from '../../services/selectors';

function BurgerIngredients() {
  const topRef = useRef(null);
  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);

  const [current, setCurrent] = React.useState('bun');

  const dispatch = useDispatch();
  const allIngredients = useSelector(ingredientSelectors.allIngredients);

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

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
    const bunYDistance = Math.abs(
      topRef.current.getBoundingClientRect().y -
        bunRef.current.getBoundingClientRect().y
    );
    const sauceYDistance = Math.abs(
      topRef.current.getBoundingClientRect().y -
        sauceRef.current.getBoundingClientRect().y
    );
    const mainYDistance = Math.abs(
      topRef.current.getBoundingClientRect().y -
        mainRef.current.getBoundingClientRect().y
    );
    const activeTabDistance = Math.min(
      bunYDistance,
      sauceYDistance,
      mainYDistance
    );
    activeTabDistance === sauceYDistance
      ? setCurrent('sauce')
      : activeTabDistance === mainYDistance
      ? setCurrent('main')
      : setCurrent('bun');
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
