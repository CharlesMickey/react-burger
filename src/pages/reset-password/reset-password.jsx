import React, { useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import {
  Input,
  Button,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styleReset from './reset-password.module.css';
import { savePassword } from '../../services/actions/auth';
import { useDispatch, useSelector } from 'react-redux';
import { userSelectors } from '../../services/selectors';

export const ResetPassword = () => {
  const [inputValue, setInputValue] = useState({
    password: '',
    token: '',
  });

  const dispatch = useDispatch();
  const { isResetPassword } = useSelector(userSelectors.authData);
  const refreshToken = localStorage.refreshToken;
const history = useHistory()
  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    setInputValue({ ...inputValue, [name]: value });
  };

  const goMainPage = () => {
    history.push('/');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(savePassword(inputValue, goMainPage));
  };

  if (!isResetPassword) {
    return <Redirect to='/forgot-password' />;
  } else if (refreshToken) {
    return <Redirect to='/' />;
  }

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
          name='token'
          value={inputValue.token || ''}
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
