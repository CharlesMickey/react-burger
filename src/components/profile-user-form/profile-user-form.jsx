import React, { useState, useRef } from 'react';
import {
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styleProfileForm from './profile-user-form.module.css';

export const ProfileUserForm = () => {
  const [inputValue, setInputValue] = useState({
    name: '',
    email: '',
    password: '',
  });

  const nameRef = useRef(null);
  const loginRef = useRef(null);
  const passwordRef = useRef(null);

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
    <form className={styleProfileForm.form} onSubmit={handleSubmit}>
      <Input
        placeholder='Имя'
        type='text'
        name='name'
        icon='EditIcon'
        ref={nameRef}
        value={inputValue.name || ''}
        onChange={handleChange}
        size={'default'}
      />
      <Input
        placeholder='Логин'
        type='email'
        name='email'
        icon='EditIcon'
        ref={loginRef}
        value={inputValue.email || ''}
        onChange={handleChange}
        size={'default'}
      />
      <Input
        placeholder='Пароль'
        type='password'
        name='password'
        icon='EditIcon'
        ref={passwordRef}
        value={inputValue.password || ''}
        onChange={handleChange}
        size={'default'}
      />
    </form>
  );
};
