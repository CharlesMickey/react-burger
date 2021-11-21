import React, { useState } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';
import {
  Input,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styleLogin from './login.module.css';
import { authorize } from '../../services/actions/auth';
import { useDispatch, useSelector } from 'react-redux';
import { userSelectors } from '../../services/selectors';

export const Login = () => {
  const { logoutRequest } = useSelector(userSelectors.authData);
  const refreshToken = localStorage.refreshToken;
  const location = useLocation();
  const [inputValue, setInputValue] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(authorize(inputValue));
  };

  return (
    <>
      {(refreshToken && !logoutRequest) ? (
        <Redirect to={location.state?.from || '/'} />
      ) : (
        <section className={styleLogin.container}>
          <h2 className='text text_type_main-medium mb-6'>Вход</h2>
          <form className={styleLogin.form} onSubmit={handleSubmit}>
            <Input
              placeholder='E-mail'
              type='email'
              name='email'
              value={inputValue.email || ''}
              onChange={handleChange}
            />
            <PasswordInput
              placeholder='Пароль'
              name='password'
              value={inputValue.password || ''}
              onChange={handleChange}
            />
            <Button type='primary' size='medium'>
              Войти
            </Button>
          </form>
          <div className={styleLogin.text}>
            <span className='text text_type_main-default text_color_inactive'>
              Вы — новый пользователь?{' '}
              <Link to='/register' className={styleLogin.link}>
                Зарегистрироваться
              </Link>
            </span>
            <span className='text text_type_main-default text_color_inactive'>
              Забыли пароль?{' '}
              <Link to='/forgot-password' className={styleLogin.link}>
                Восстановить пароль
              </Link>
            </span>
          </div>
        </section>
      )}
    </>
  );
};
