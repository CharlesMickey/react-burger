import { BASE_URL } from './constants';

export const checkResponse = (response) => {
  return response.ok
    ? response.json()
    : Promise.reject(
        new Error(`Ошибка ${response.status}: ${response.statusText}`)
      );
};

console.log(`${BASE_URL}/ingredients`);

export const getData = () => {
  return fetch(`${BASE_URL}/ingredients`, {
    method: 'GET',
  }).then((res) => {
    return checkResponse(res);
  });
};
