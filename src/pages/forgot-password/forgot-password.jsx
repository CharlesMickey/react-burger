import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styleForgot from './forgot-password.module.css';
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../../services/actions/auth';

export const ForgotPassword = () => {
  const [inputValue, setInputValue] = useState({
    email: '',
  });

  const dispatch = useDispatch()

  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleClick = (inputValue) => {
    dispatch(forgotPassword(inputValue))
  }

  return (
    <section className={styleForgot.container}>
      <h2 className='text text_type_main-medium mb-6'>Восстановление пароля</h2>
      <form className={styleForgot.form} onSubmit={handleSubmit}>
        <Input
          placeholder='Укажите e-mail'
          type='email'
          name='email'
          value={inputValue.email || ''}
          onChange={handleChange}
        />
      <Button onClick={handleClick}  type='primary' size='medium'>
          Восстановить
        </Button>
      </form>
      <div className={styleForgot.text}>
        <span className='text text_type_main-default text_color_inactive'>
          Вспомнили пароль?{' '}
          <Link to='/login' className={styleForgot.link}>
            Войти
          </Link>
        </span>
      </div>
    </section>
  );
};
