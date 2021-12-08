import React, { forwardRef, memo } from 'react';
import BurgerIngredientsCard from '../burger-ingredients-card/burger-ingredients-card';
import burgerIngredientsCardList from './burger-ingredients-card-list.module.css';
import { ITypeIngredient } from '../../utils/type-constants';
import { TRef } from './type';

const BurgerIngredientsCardList = forwardRef<
  HTMLDivElement,
  TRef<ITypeIngredient>
>(({ title, data }, ref) => {
  return (
    <section ref={ref}>
      <h2 className='mt-0 text text_type_main-medium'>{title}</h2>
      <ul className={burgerIngredientsCardList.list}>
        {data.map((item: ITypeIngredient) => (
          <li key={item._id} className={burgerIngredientsCardList.item}>
            <BurgerIngredientsCard card={item} />
          </li>
        ))}
      </ul>
    </section>
  );
});

export default memo(BurgerIngredientsCardList);
