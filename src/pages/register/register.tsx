import React, { SyntheticEvent, useState } from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';
import {
  Input,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styleRegister from './register.module.css';
import { useDispatch, useSelector }  from '../../services/type/hooks';
import { registerAction } from '../../services/actions/auth';
import { userSelectors } from '../../services/selectors';
import { CONSTANTS } from '../../utils/constants';

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
  const handleChange = (e: {target: HTMLInputElement}) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(registerAction(inputValue));
  };

  return (
    <>
      {refreshToken && !logoutRequest ? (
        <Redirect to={location.state?.from || '/'} />
      ) : (
        <section className={styleRegister.container}>
          <h2 className='text text_type_main-medium mb-6'>
            {CONSTANTS.PAGE_REGISTER.TITLE}
          </h2>
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
              name='password'
              value={inputValue.password || ''}
              onChange={handleChange}
            />
            <Button type='primary' size='medium'>
              {CONSTANTS.PAGE_REGISTER.BUTTON_NAME}
            </Button>
          </form>
          <div className={styleRegister.text}>
            <span className='text text_type_main-default text_color_inactive'>
              {CONSTANTS.PAGE_REGISTER.ALREADY_REGISTERED}{' '}
              <Link to='/login' className={styleRegister.link}>
                {CONSTANTS.PAGE_REGISTER.ENTER}
              </Link>
            </span>
          </div>
        </section>
      )}{' '}
    </>
  );
};
