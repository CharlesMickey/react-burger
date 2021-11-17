import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Input,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styleLogin from './login.module.css';

export const Login = () => {
  const [inputValue, setInputValue] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
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
  );
};
