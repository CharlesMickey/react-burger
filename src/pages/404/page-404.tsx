import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { CONSTANTS } from '../../utils/constants';
import style404 from './page-404.module.css';

export const Page404 = () => {
  const history = useHistory();
  return (
    <div className={style404.section}>
      <h2 className='text text_type_digits-large'>
        {CONSTANTS.PAGE_404.TITLE}
      </h2>
      <p className='text text_type_main-large'>{CONSTANTS.PAGE_404.SUBTITLE}</p>
      <Button
        onClick={() => history.replace('/')}
        type='secondary'
        size='large'
      >
        {CONSTANTS.PAGE_404.BUTTON_NAME}
      </Button>
    </div>
  );
};
