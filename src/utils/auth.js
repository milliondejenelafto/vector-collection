// utils/auth.js
export const storeToken = (token) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('jwtToken', token);
    }
  };
  
  export const getToken = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('jwtToken');
    }
    return null;
  };
  
  export const removeToken = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('jwtToken');
    }
  };
  