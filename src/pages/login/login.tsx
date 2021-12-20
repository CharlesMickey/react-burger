import React, { SyntheticEvent, useState } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';
import {
  Input,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styleLogin from './login.module.css';
import { authorize } from '../../services/actions/auth';
import { useDispatch, useSelector }  from '../../services/type/hooks';
import { userSelectors } from '../../services/selectors';
import { CONSTANTS } from '../../utils/constants';

export const Login = () => {
  const { logoutRequest } = useSelector(userSelectors.authData);
  const refreshToken = localStorage.refreshToken;
  const location = useLocation();
  const [inputValue, setInputValue] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const handleChange = (e: { target: HTMLInputElement }) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(authorize(inputValue));
  };

  return (
    <>
      {refreshToken && !logoutRequest ? (
        <Redirect to={location.state?.from || '/'} />
      ) : (
        <section className={styleLogin.container}>
          <h2 className='text text_type_main-medium mb-6'>
            {CONSTANTS.PAGE_LOGIN.TITLE}
          </h2>
          <form className={styleLogin.form} onSubmit={handleSubmit}>
            <Input
              placeholder='E-mail'
              type='email'
              name='email'
              value={inputValue.email || ''}
              onChange={handleChange}
            />
            <PasswordInput
              name='password'
              value={inputValue.password || ''}
              onChange={handleChange}
            />
            <Button type='primary' size='medium'>
              {CONSTANTS.PAGE_LOGIN.BUTTON_NAME}
            </Button>
          </form>
          <div className={styleLogin.text}>
            <span className='text text_type_main-default text_color_inactive'>
              {CONSTANTS.PAGE_LOGIN.NEW_USER}{' '}
              <Link to='/register' className={styleLogin.link}>
                {CONSTANTS.PAGE_LOGIN.REGISTER}
              </Link>
            </span>
            <span className='text text_type_main-default text_color_inactive'>
              {CONSTANTS.PAGE_LOGIN.FORGOT_PASSWORD}{' '}
              <Link to='/forgot-password' className={styleLogin.link}>
                {CONSTANTS.PAGE_LOGIN.RESET_PASSWORD}
              </Link>
            </span>
          </div>
        </section>
      )}
    </>
  );
};
