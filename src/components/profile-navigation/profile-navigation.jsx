import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import { logout } from '../../services/actions/auth';
import styleProfileNavigation from './profile-navigation.module.css';

export const ProfileNavigation = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const goLogin = () => {
    history.push('/login');
  };
  const handleClick = () => {
    dispatch(logout(goLogin));
  };
  const { pathname } = useLocation();
  return (
    <div className={styleProfileNavigation.container}>
      <ul className={styleProfileNavigation.list}>
        <li className={styleProfileNavigation.listItem}>
          <NavLink
            className={`text text_type_main-medium ${styleProfileNavigation.link}`}
            activeClassName={styleProfileNavigation.active_link}
            to='/profile'
            exact
          >
            Профиль
          </NavLink>
        </li>
        <li className={styleProfileNavigation.listItem}>
          <NavLink
            className={`text text_type_main-medium ${styleProfileNavigation.link}`}
            activeClassName={styleProfileNavigation.active_link}
            to='/profile/orders'
            exact
          >
            История заказов
          </NavLink>
        </li>
        <li className={styleProfileNavigation.listItem}>
          <NavLink
            onClick={handleClick}
            className={`text text_type_main-medium ${styleProfileNavigation.link}`}
            activeClassName={styleProfileNavigation.active_link}
            to='/login'
            exact
          >
            Выход
          </NavLink>
        </li>
      </ul>
      {pathname === '/profile' && (
        <span className={`text text_type_main-default text_color_inactive`}>
          В этом разделе вы можете изменить свои персональные данные{' '}
        </span>
      )}
    </div>
  );
};
