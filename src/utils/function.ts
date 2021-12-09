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
