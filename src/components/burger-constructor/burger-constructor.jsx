import {
  Button,
  ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';

function ConstructorBurger({ bun, sauce, main }) {
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <ConstructorElement
          type='top'
          isLocked={true}
          text='Краторная булка N-200i (верх)'
          price={200}
          thumbnail={bun[0].image}
        />
        <ConstructorElement
          text='Краторная булка N-200i (верх)'
          price={50}
          thumbnail={sauce[0].image}
        />
        <ConstructorElement
          type='bottom'
          isLocked={true}
          text='Краторная булка N-200i (низ)'
          price={200}
          thumbnail={bun[0].image}
        />
      </div>
      <Button type='primary' size='large'>
        Оформить заказ
      </Button>
    </>
  );
}

export default ConstructorBurger;
