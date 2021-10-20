import React from 'react';
import done from '../../images/done.png';
import PropTypes from 'prop-types';
import styleOrderDetails from './order-details.module.css';

function OrderDetails({orderNumber}) {
  return (
    <section className={`pr-15 pb-15 pl-15 ${styleOrderDetails.section}`}>
      <h3
        className={`mt-4 text text_type_digits-large ${styleOrderDetails.numberOrder}`}
      >
        {orderNumber}
      </h3>
      <p className='mt-8 text text_type_main-medium'>идентификатор заказа</p>
      <img className='mt-15 mb-15' src={done} alt='Заказ готовится' />
      <p className='mb-2 text text_type_main-default'>Ваш заказ начали готовить</p>
      <span className={` text text_type_main-default ${styleOrderDetails.spanColor}`}>Дождитесь готовности на орбитальной станции</span>
    </section>
  );
}

export default OrderDetails;

OrderDetails.propTypes = {
  orderNumber: PropTypes.number.isRequired
}