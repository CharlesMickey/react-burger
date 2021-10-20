import React from 'react';
import styleHeader from './app-header.module.css';
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader() {
  return (
    <header className={styleHeader.header}>
      <div className={styleHeader.container}>
        <div className={` pt-4  pb-4 pl-5 ${styleHeader.position}`}>
          <BurgerIcon type={'primary'} />
          <span className='text text_type_main-default ml-2 mr-2 pr-5'>
            Конструктор
          </span>
          <ListIcon type={'secondary'} />
          <span className='text text_type_main-default text_color_inactive  ml-2 '>
            Лента заказов
          </span>
        </div>
        <div className={styleHeader.logo}>
          <Logo />
        </div>
        <div
          className={`pt-4  pb-4 pl-5 pr-5 ${styleHeader.position} ${styleHeader.buttonProfile}`}
        >
          <ProfileIcon type={'secondary'} />
          <span className='ml-3 text text_type_main-default text_color_inactive'>
            Личный кабинет
          </span>
        </div>
      </div>
    </header>
  );
}

export default AppHeader;
