import React, { FC } from 'react';
import doneImg from '../../images/svg/done.svg';
import styleOrderDetails from './order-details.module.css';
import { ingredientSelectors } from '../../services/selectors';
import { useSelector } from '../../services/type/hooks';

const OrderDetails: FC = () => {
  const [counter, setCounter] = React.useState(15);
  React.useEffect(() => {
    let timer: number;
    if (counter > 0) {
      timer = window.setTimeout(
        () => setCounter((counter) => counter - 1),
        1000
      );
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [counter]);

  const orderNumber = useSelector(ingredientSelectors.orderNumber);

  return (
    <section className={`pr-15 pb-15 pl-15 ${styleOrderDetails.section}`}>
      {counter > 0 && (
        <h3
          className={`mt-4 text text_type_digits-large ${styleOrderDetails.numberOrder}`}
        >
          {counter}
        </h3>
      )}
      {orderNumber && (
        <h3
          className={`mt-4 text text_type_digits-large ${styleOrderDetails.numberOrder}`}
        >
          {orderNumber}
        </h3>
      )}
      <p className='mt-8 text text_type_main-medium'>
        {orderNumber ? 'идентификатор заказа' : 'до готовности заказа'}
      </p>
      <img src={doneImg}  className='mt-15 mb-15' alt='Заказ готовится' />
      <p className='mb-2 text text_type_main-default'>
        {orderNumber ? 'Ваш заказ готов' : 'Ваш заказ начали готовить'}
      </p>
      <span
        className={` text text_type_main-default ${styleOrderDetails.spanColor}`}
      >
        {orderNumber
          ? 'Пожалуйста, пройдите в зону выдачи заказов '
          : 'Дождитесь готовности на орбитальной станции'}
      </span>
    </section>
  );
};

export default OrderDetails;
