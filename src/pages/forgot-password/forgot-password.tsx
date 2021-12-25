import React, { SyntheticEvent, useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styleForgot from './forgot-password.module.css';
import { forgotPassword } from '../../services/actions/auth';
import { CONSTANTS } from '../../utils/constants';
import { useDispatch } from '../../services/type/hooks';

export const ForgotPassword = () => {
  const [inputValue, setInputValue] = useState({
    email: '',
  });
  const history = useHistory();
  const dispatch = useDispatch();
  const refreshToken = localStorage.refreshToken;
  const handleChange = (e: { target: HTMLInputElement }) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    setInputValue({ ...inputValue, [name]: value });
  };

  const goResetPassword = () => {
    history.push('/reset-password');
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(forgotPassword(inputValue, goResetPassword));
  };

  if (refreshToken) {
    return <Redirect to='/' />;
  }
  return (
    <section className={styleForgot.container}>
      <h2 className='text text_type_main-medium mb-6'>
        {CONSTANTS.PAGE_FORGOT_PASSWORD.TITLE}
      </h2>
      <form className={styleForgot.form} onSubmit={handleSubmit}>
        <Input
          placeholder='Укажите e-mail'
          type='email'
          name='email'
          value={inputValue.email || ''}
          onChange={handleChange}
        />
        <Button disabled={!inputValue.email} type='primary' size='medium'>
          {CONSTANTS.PAGE_FORGOT_PASSWORD.BUTTON_NAME}
        </Button>
      </form>
      <div className={styleForgot.text}>
        <span className='text text_type_main-default text_color_inactive'>
          {CONSTANTS.PAGE_FORGOT_PASSWORD.REMEMBERED_PASSWORD}{' '}
          <Link to='/login' className={styleForgot.link}>
            {CONSTANTS.PAGE_FORGOT_PASSWORD.ENTER}
          </Link>
        </span>
      </div>
    </section>
  );
};
