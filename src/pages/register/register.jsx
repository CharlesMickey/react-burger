import React, { useState } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';
import {
  Input,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styleRegister from './register.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { registerAction } from '../../services/actions/auth';
import { userSelectors } from '../../services/selectors';

export const Register = () => {
  const [inputValue, setInputValue] = useState({
    name: '',
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const refreshToken = localStorage.refreshToken;
  const { logoutRequest } = useSelector(userSelectors.authData);
  const location = useLocation();
  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerAction(inputValue));
  };

  return (
    <>
      {refreshToken && !logoutRequest ? (
        <Redirect to={location.state?.from || '/'} />
      ) : (
        <section className={styleRegister.container}>
          <h2 className='text text_type_main-medium mb-6'>Регистрация</h2>
          <form className={styleRegister.form} onSubmit={handleSubmit}>
            <Input
              placeholder='Имя'
              type='text'
              name='name'
              value={inputValue.name || ''}
              onChange={handleChange}
            />
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
              Зарегистрироваться
            </Button>
          </form>
          <div className={styleRegister.text}>
            <span className='text text_type_main-default text_color_inactive'>
              Уже зарегистрированы?{' '}
              <Link to='/login' className={styleRegister.link}>
                Войти
              </Link>
            </span>
          </div>
        </section>
      )}{' '}
    </>
  );
};
