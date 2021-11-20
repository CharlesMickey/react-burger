import { BASE_URL } from './constants';
import { getCookie } from './function';

export const checkResponse = (response) => {
  return response.ok
    ? response.json()
    : Promise.reject(
        new Error(`Ошибка ${response.status}: ${response.statusText}`)
      );
};

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const getData = () => {
  return fetch(`${BASE_URL}/ingredients`, {
    method: 'GET',
  }).then((res) => {
    return checkResponse(res);
  });
};

export const getOrderOfNumber = (ingredients) => {
  return fetch(`${BASE_URL}/orders`, {
    headers,
    method: 'POST',
    body: JSON.stringify({ ingredients }),
  }).then((res) => {
    return checkResponse(res);
  });
};

export const register = ({ email, password, name }) => {
  return fetch(`${BASE_URL}/auth/register`, {
    headers,
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({ email, password, name }),
  }).then((res) => checkResponse(res));
};

export const login = ({ email, password }) => {
  return fetch(`${BASE_URL}/auth/login`, {
    headers,
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({ email, password }),
  }).then((res) => checkResponse(res));
};

export const logOut = () => {
  return fetch(`${BASE_URL}/auth/logout`, {
    headers,
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({ token: localStorage.refreshToken }),
  }).then((res) => checkResponse(res));
};

export const getNewToken = () => {
  return fetch(`${BASE_URL}/auth/token`, {
    headers,
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({ token: localStorage.refreshToken }),
  }).then((res) => checkResponse(res));
};

export const getUserInfo = () => {
  return fetch(`${BASE_URL}/auth/user`, {
    headers: {
      headers,
      Authorization: `Bearer ${getCookie('token')}`,
    },
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  }).then((res) => checkResponse(res));
};

export const updateUserInfo = ({ name, email, password }) => {
  return fetch(`${BASE_URL}/auth/user`, {
    method: 'PATCH',
    headers: {
      ...headers,
      Authorization: `Bearer ${getCookie('token')}`,
    },
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({ name, email, password }),
  }).then((res) => checkResponse(res));
};

export const getCodeChangePassword = ({ email }) => {
  return fetch(`${BASE_URL}/password-reset`, {
    headers,
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({ email }),
  }).then((res) => checkResponse(res));
};

export const saveNewPassword = ({ password, token }) => {
  return fetch(`${BASE_URL}/password-reset/reset`, {
    headers,
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({ password, token }),
  }).then((res) => checkResponse(res));
};
