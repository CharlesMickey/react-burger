import { BASE_URL } from './constants';

export const checkResponse = (response) => {
  return response.ok
    ? response.json()
    : Promise.reject(
        new Error(`Ошибка ${response.status}: ${response.statusText}`)
      );
};


const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};


export const getData = () => {
  return fetch(`${BASE_URL}/ingredients`, {
    method: 'GET',
  }).then((res) => {
    return checkResponse(res);
  });
};

export const getOrderNumber = (ingredients) => {
  return fetch(`${BASE_URL}/orders`, {
    headers,
    method: 'POST',
    body: JSON.stringify({  ingredients }),
  }).then((res) => {
    return checkResponse(res);
  });
};
