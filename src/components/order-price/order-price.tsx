import React, { FC } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import stylePrice from './order-price.module.css'

type TPrice = {
    price: string | number | null
}

const OrderPrice: FC<TPrice> = ({price}) => {
  return (
    <div className={stylePrice.div} >
      <span className='text text_type_digits-default'>
        {price}
      </span>
      <CurrencyIcon type='primary' />
    </div>
  );
};

export default OrderPrice;
