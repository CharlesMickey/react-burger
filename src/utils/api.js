import { BASE_URL } from './constants';

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

export const getCodeChangePassword = ({email}) => {
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
  console.log({password, token})
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
