import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { useHistory } from 'react-router-dom';
import style404 from './page-404.module.css';
export const Page404 = () => {
  const history = useHistory();
  return (
    <div className={style404.section}>
      <h2 className='text text_type_digits-large'> 404 </h2>
      <p className='text text_type_main-large'>Кажется такой страницы нет :(</p>
      <Button
        onClick={() => history.replace('/')}
        type='secondary'
        size='large'
      >
        Создать космо бургер
      </Button>
    </div>
  );
};
