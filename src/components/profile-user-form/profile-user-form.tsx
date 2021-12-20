import React, { useState, useRef, useEffect, SyntheticEvent } from 'react';
import {
  Button,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styleProfileForm from './profile-user-form.module.css';
import { useDispatch, useSelector }  from '../../services/type/hooks';
import { userSelectors } from '../../services/selectors';
import { updateUserProfile } from '../../services/actions/auth';

export const ProfileUserForm = () => {
  const { name, email } = useSelector(userSelectors.authData);
  const [inputValue, setInputValue] = useState({
    name: '',
    email: '',
    password: '',
    inputName: true,
    inputEmail: true,
    inputPassword: true,
  });

  const dispatch = useDispatch();
  const defaultName = name === inputValue.name ? false : true;
  const defaultEmail = email === inputValue.email ? false : true;
  const defaultPassword = inputValue.password.length === 0 ? false : true;

  const nameRef = useRef<HTMLInputElement>(null);
  const loginRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement
    const name = target.name;
    const value = target.value;
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(updateUserProfile(inputValue));
    setInputValue({
      ...inputValue,
      password: '',
      inputName: true,
      inputEmail: true,
      inputPassword: true,
    });
  };

  useEffect(() => {
    setInputValue((inputValue) => {
      return { ...inputValue, name: name, email: email };
    });
  }, [name, email]);

  const onIconClickName = () => {
    setTimeout(() => nameRef?.current?.focus(), 0);
    setInputValue({ ...inputValue, inputName: !inputValue.inputName });
  };
  const onIconClickEmail = () => {
    setTimeout(() => loginRef?.current?.focus(), 0);
    setInputValue({ ...inputValue, inputEmail: !inputValue.inputEmail });
  };
  const onIconClickPassword = () => {
    setTimeout(() => passwordRef?.current?.focus(), 0);
    setInputValue({ ...inputValue, inputPassword: !inputValue.inputPassword });
  };

  const iconName = inputValue.inputName ? 'EditIcon' : 'CloseIcon';
  const iconEmail = inputValue.inputEmail ? 'EditIcon' : 'CloseIcon';
  const iconPassword = inputValue.inputPassword ? 'EditIcon' : 'CloseIcon';

  const handleClick = () => {
    setInputValue({
      name: name,
      email: email,
      password: '',
      inputName: true,
      inputEmail: true,
      inputPassword: true,
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styleProfileForm.form}>
      <Input
        placeholder='Имя'
        type='text'
        name='name'
        icon={iconName}
        ref={nameRef}
        value={inputValue.name || ''}
        onChange={handleChange}
        size={'default'}
        disabled={inputValue.inputName}
        onIconClick={onIconClickName}
      />
      <Input
        placeholder='Логин'
        type='email'
        name='email'
        icon={iconEmail}
        ref={loginRef}
        value={inputValue.email || ''}
        onChange={handleChange}
        size={'default'}
        disabled={inputValue.inputEmail}
        onIconClick={onIconClickEmail}
      />
      <Input
        placeholder='Пароль'
        type='password'
        name='password'
        icon={iconPassword}
        ref={passwordRef}
        value={inputValue.password || ''}
        onChange={handleChange}
        size={'default'}
        disabled={inputValue.inputPassword}
        onIconClick={onIconClickPassword}
      />
      {(defaultName || defaultEmail || defaultPassword) && (
        <div>
          <Button onClick={handleClick} type='secondary' size='medium'>
            Отмена
          </Button>
          <Button type='primary' size='small'>
            Сохранить
          </Button>
        </div>
      )}
    </form>
  );
};
