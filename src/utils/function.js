export function setCookie(name, value, options = {}) {
  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie =
    encodeURIComponent(name) + '=' + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += '; ' + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += '=' + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

export function deleteCookie(name) {
  setCookie(name, null, { expires: -1 });
}

export function getCookie(name) {
  let matches = document.cookie.match(
    new RegExp(
      '(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)'
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export const getTokens = (res) => {
  const accessToken = res.accessToken.split('Bearer ')[1];
  const refreshToken = res.refreshToken;
  setCookie('token', accessToken, { 'max-age': 1200 });
  localStorage.setItem('refreshToken', refreshToken);
};

export const signOut = () => {
  deleteCookie('token');
  localStorage.removeItem('refreshToken');
};
