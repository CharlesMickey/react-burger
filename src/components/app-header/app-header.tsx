import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styleHeader from './app-header.module.css';
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader() {
  const { pathname }= useLocation();

  return (
    <header className={styleHeader.header}>
      <div className={styleHeader.container}>
        <div className={` pt-4  pb-4 pl-5 ${styleHeader.position}`}>
          <NavLink
            exact
            to='/'
            className={`text text_type_main-default mr-2 pr-5 ${styleHeader.link}`}
            activeClassName={styleHeader.active_link}
          >
            <BurgerIcon type={pathname === '/' ? 'primary' : 'secondary'} />
            <span className='ml-2'>Конструктор</span>
          </NavLink>
          <NavLink
            to='/order-feed'
            className={`text text_type_main-default mr-2 pr-5  ${styleHeader.link}`}
            activeClassName={styleHeader.active_link}
          >
            <ListIcon
              type={pathname === '/order-feed' ? 'primary' : 'secondary'}
            />
            <span className='ml-2 '>Лента заказов</span>
          </NavLink>
        </div>
        <div className={styleHeader.logo}>
          <Logo />
        </div>
        <NavLink
          to='/profile'
          className={`pt-4 pb-4 pl-5 pr-5 text text_type_main-default ${styleHeader.position} ${styleHeader.buttonProfile} ${styleHeader.link}`}
          activeClassName={styleHeader.active_link}
        >
          <ProfileIcon
            type={pathname === '/profile' || pathname === '/profile/orders' ? 'primary' : 'secondary'}
          />
          <span className='ml-3'>Личный кабинет</span>
        </NavLink>
      </div>
    </header>
  );
}

export default AppHeader;
