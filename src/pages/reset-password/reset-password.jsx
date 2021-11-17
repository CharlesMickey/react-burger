import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Input,
  Button,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styleReset from './reset-password.module.css';

export const ResetPassword = () => {
  const [inputValue, setInputValue] = useState({
    password: '',
    cod: '',
  });

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
    <section className={styleReset.container}>
      <h2 className='text text_type_main-medium mb-6'>Восстановление пароля</h2>
      <form className={styleReset.form} onSubmit={handleSubmit}>
        <PasswordInput
          name='password'
          value={inputValue.password || ''}
          onChange={handleChange}
          size={'default'}
        />
        <Input
          placeholder='Введите код из письма'
          type='text'
          name='cod'
          value={inputValue.cod || ''}
          onChange={handleChange}
          size={'default'}
        />
        <Button type='primary' size='medium'>
          Сохранить
        </Button>
      </form>
      <div className={styleReset.text}>
        <span className='text text_type_main-default text_color_inactive'>
          Вспомнили пароль?{' '}
          <Link to='/login' className={styleReset.link}>
            Войти
          </Link>
        </span>
      </div>
    </section>
  );
};
