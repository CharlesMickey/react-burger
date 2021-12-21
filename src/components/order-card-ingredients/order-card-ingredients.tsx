import React, { memo, FC } from 'react';
import styleOrderCardIngredients from './order-card-ingredients.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { CONSTANTS } from '../../utils/constants';
import { useSelector } from '../../services/type/hooks';
import { ingredientSelectors } from '../../services/selectors';
import { getOrderStatus } from '../../utils/function';
import { ITypeIngredient } from '../../utils/type-constants';

const OrderCardIngredients: FC<any> = ({
  name,
  number,
  create,
  ingredients,
  status,
}) => {
  const allIngredients: any = useSelector(ingredientSelectors.allIngredients);
  const orderIngredients = ingredients
    .map((id: string) =>
      allIngredients.filter((item: ITypeIngredient) => item._id === id)
    )
    .flat()
    .slice(0, 6);
  const countIngredients = ingredients.length - 6;

  const orderStatus =
    status && getOrderStatus(status, styleOrderCardIngredients);

  return (
    <section className={styleOrderCardIngredients.section}>
      <div className={styleOrderCardIngredients.orderTime}>
        <span className='text text_type_digits-default'>{`#${number}`}</span>
        <span className='text text_type_main-default text_color_inactive'>
          Сегодня, 16:20 i-GMT+3
        </span>
      </div>
      <div className='mb-6'>
        <h3 className='text text_type_main-medium'>{name}</h3>
        {status && (
          <p
            className={`text text_type_main-default mt-2 ${orderStatus.colorStatus}`}
          >
            {orderStatus.nameStatus}
          </p>
        )}
      </div>
      <div className={styleOrderCardIngredients.containerOrderImg}>
        <ul className={styleOrderCardIngredients.list}>
          {orderIngredients.map((item: ITypeIngredient, index: number) => {
           const zIndex = 6 - index
            return (
              <li className={styleOrderCardIngredients.listItem} key={index} style={{zIndex}}>
                <img
                  src={item.image_large}
                  alt={item.name}
                  className={styleOrderCardIngredients.img}
                />
              </li>
            );
          })}
          {ingredients.length > 6 && (
            <div className={styleOrderCardIngredients.overlay}>
              {' '}
              <span className='text text_type_main-default'>{`+${countIngredients}`}</span>
            </div>
          )}
        </ul>
        <div className={styleOrderCardIngredients.containerPrice}>
          <span className='text text_type_digits-default'>150</span>
          <CurrencyIcon type='primary' />
        </div>
      </div>
    </section>
  );
};

export default memo(OrderCardIngredients);
