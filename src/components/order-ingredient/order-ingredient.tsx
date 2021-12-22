import { FC, memo } from 'react';
import OrderPrice from '../order-price/order-price';
import styleOrderIngredient from './order-ingredient.module.css';

const OrderIngredient: FC<any> = ({ ingredient, quantity }) => {
  const ingredientPrice =
    ingredient.type === 'bun'
      ? `2 x ${ingredient.price}`
      : `${quantity} x ${ingredient.price}`;

  return (
    <section className={styleOrderIngredient.section}>
      <div className={styleOrderIngredient.containerDiv}>
        <img
          className={`mr-4 ${styleOrderIngredient.img}`}
          src={ingredient.image}
          alt={ingredient.name}
        />
        <span
          className={`text text_type_main-default mr-4 ${styleOrderIngredient.ingredientName}`}
        >
          {ingredient.name}
        </span>
      </div>
      <div className={styleOrderIngredient.containerDiv}>
        <OrderPrice price={ingredientPrice} />
      </div>
    </section>
  );
};

export default memo(OrderIngredient);
