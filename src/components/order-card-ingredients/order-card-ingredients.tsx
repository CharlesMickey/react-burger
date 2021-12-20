import React, { memo, FC } from 'react';
import styleOrderCardIngredients from './order-card-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { CONSTANTS } from '../../utils/constants';
import { useSelector } from '../../services/type/hooks';
import { ingredientSelectors } from '../../services/selectors';

const OrderCardIngredients: FC<any> = ({
  name,
  number,
  create,
  ingredients,
}) => {
  const allIngredients: any = useSelector(ingredientSelectors.allIngredients);
  const p = ingredients.map((id: any) =>
    allIngredients.filter((item: any) => item._id === id)
  );

  return (
    <section className={styleOrderCardIngredients.section}>
      <div className={styleOrderCardIngredients.orderTime}>
        <span className='text text_type_digits-default'>{`#${number}`}</span>
        <span className='text text_type_main-default text_color_inactive'>
          Сегодня, 16:20 i-GMT+3
        </span>
      </div>
    </section>
  );
};

export default memo(OrderCardIngredients);
