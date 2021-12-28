import {
  TUserDataApi,
  TResetPasswordDataApi,
  TLoginDataApi,
  TNewPasswordApi,
} from './type-constants';
import { BASE_URL } from './constants';
import { getCookie } from './function';

export const checkResponse = (response: Response) => {
  return response.ok
    ? response.json()
    : response.json().then((err) => Promise.reject(err));
};

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const getData = async () => {
  const res = await fetch(`${BASE_URL}/ingredients`, {
    method: 'GET',
  });
  return checkResponse(res);
};

export const getOrderOfNumber = async (ingredients: string[]) => {
  const res = await fetch(`${BASE_URL}/orders`, {
    headers: {
      ...headers,
      Authorization: `Bearer ${getCookie('token')}`,
    },
    method: 'POST',
    body: JSON.stringify({ ingredients }),
  });
  return checkResponse(res);
};

export const register = async ({ email, password, name }: TUserDataApi) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    headers,
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({ email, password, name }),
  });
  return checkResponse(res);
};

export const login = async ({ email, password }: TLoginDataApi) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    headers,
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({ email, password }),
  });
  return checkResponse(res);
};

export const logOut = async () => {
  const res = await fetch(`${BASE_URL}/auth/logout`, {
    headers,
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({ token: localStorage.refreshToken }),
  });
  return checkResponse(res);
};

export const getNewToken = async () => {
  const res = await fetch(`${BASE_URL}/auth/token`, {
    headers,
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({ token: localStorage.refreshToken }),
  });
  return checkResponse(res);
};

export const getUserInfo = async () => {
  const res = await fetch(`${BASE_URL}/auth/user`, {
    headers: {
      ...headers,
      Authorization: `Bearer ${getCookie('token')}`,
    },
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  });
  return checkResponse(res);
};

export const updateUserInfo = async ({
  name,
  email,
  password,
}: TUserDataApi) => {
  const res = await fetch(`${BASE_URL}/auth/user`, {
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
  });
  return checkResponse(res);
};

export const getCodeChangePassword = async (email: TResetPasswordDataApi) => {
  const res = await fetch(`${BASE_URL}/password-reset`, {
    headers,
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(email),
  });
  return checkResponse(res);
};

export const saveNewPassword = async ({ password, token }: TNewPasswordApi) => {
  const res = await fetch(`${BASE_URL}/password-reset/reset`, {
    headers,
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({ password, token }),
  });
  return checkResponse(res);
};
