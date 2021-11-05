import React, { memo, useEffect } from 'react';
import styleIngredients from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientsCardList from '../burger-ingredients-card-list/burger-ingredients-card-list';
import { useDispatch, useSelector } from 'react-redux';
import { getItems } from '../../services/actions/ingredients';
import { ingredientSelectors } from '../../services/selectors';

function BurgerIngredients() {
  const [current, setCurrent] = React.useState('one');

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
