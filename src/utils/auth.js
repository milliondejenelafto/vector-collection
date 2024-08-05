import Cookies from 'js-cookie';

export const setToken = (token) => {
  Cookies.set('token', token, { secure: true, sameSite: 'strict', expires: 7 });
};

export const getToken = () => {
  return Cookies.get('token');
};

export const removeToken = () => {
  Cookies.remove('token');
};
