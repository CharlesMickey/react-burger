import React, { memo, useRef, FC } from 'react';
import styleIngredients from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientsCardList from '../burger-ingredients-card-list/burger-ingredients-card-list';
import { useSelector } from '../../services/type/hooks';
import { ingredientSelectors } from '../../services/selectors';
import { ITypeIngredient } from '../../utils/type-constants';

const BurgerIngredients: FC = () => {
  const topRef = useRef<HTMLDivElement>(null);
  const bunRef = useRef<HTMLDivElement>(null);
  const sauceRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  const [current, setCurrent] = React.useState('bun');
  const allIngredients: ITypeIngredient[] = useSelector(
    ingredientSelectors.allIngredients
  );

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
    if (
      sauceRef.current &&
      mainRef.current &&
      bunRef.current &&
      topRef.current
    ) {
      const topDistance = topRef?.current?.getBoundingClientRect().y;
      const bunYDistance = Math.abs(
        topDistance - bunRef?.current?.getBoundingClientRect().y
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
    }
  };

  const handleClick: (arg: string) => void = (current) => {
    if (current === 'bun') bunRef.current?.scrollIntoView(true);
    if (current === 'sauce') sauceRef.current?.scrollIntoView(true);
    if (current === 'main') mainRef.current?.scrollIntoView(true);
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
};

export default memo(BurgerIngredients);
