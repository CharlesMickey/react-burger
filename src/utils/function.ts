import { TOrder } from '../services/type/socket';
import { ITypeIngredient } from './type-constants';

type TSetCookie = {
  expires?: any;
} & {
  [key: string]: number | string | boolean;
};
export function setCookie(
  name: string,
  value: string | number | boolean,
  props?: TSetCookie
) {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + '=' + value;
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
}

export function deleteCookie(name: string) {
  setCookie(name, false, { expires: -1 });
}

export function getCookie(name: string) {
  let matches = document.cookie.match(
    new RegExp(
      '(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)'
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

type TGetTokens = {
  accessToken: string;
  refreshToken: string;
  success: boolean;
};

export const getTokens = (res: TGetTokens) => {
  const accessToken = res.accessToken.split('Bearer ')[1];
  const refreshToken = res.refreshToken;
  setCookie('token', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
};

export const signOut = () => {
  localStorage.removeItem('refreshToken');
  deleteCookie('token');
};

export const delToken = () => {
  deleteCookie('token');
};

export const getOrderStatus = (
  status: string,
  style: { [key: string]: string }
) => {
  return status === 'done'
    ? { nameStatus: 'Выполнен', colorStatus: style.doneColor }
    : status === 'pending'
    ? { nameStatus: 'Готовится', colorStatus: style.pendingColor }
    : { nameStatus: 'Отменён', colorStatus: style.cancelledColor };
};

export const getOrderIngredients = (
  ingredients: string[],
  allIngredients: ITypeIngredient[]
) => {
  return ingredients
    .map((id: string) =>
      allIngredients.filter((item: ITypeIngredient) => item._id === id)
    )
    .flat();
};

export const getOrderPrice = (ingredients: ITypeIngredient[]) => {
  return ingredients.reduce(
    (acc: number, curr: ITypeIngredient) =>
      curr.type === 'bun' ? 2 * curr.price + acc : acc + curr.price,
    0
  );
};

export const getOrderNumbers = (orders: TOrder[]) => {
  return orders.slice(0, 35).reduce(
    (acc: any, curr: TOrder) => {
       curr.status === 'done'
        ? acc.done.push(curr.number)
        : acc.pending.push(curr.number);
        return acc
    },
    { done: [], pending: [] }
  );
};

export const getQuantityIngredients = (ingredients: string[]) => {
  const ingredientsWithCounter = {};
  ingredients.reduce((acc: any, el: any) => {
    acc[el] = (acc[el] || 0) + 1;
    return acc;
  }, ingredientsWithCounter);
  return ingredientsWithCounter;
};
