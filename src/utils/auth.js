// utils/auth.js
export const storeToken = (token) => {
    if (typeof window !== 'undefined') {
      console.log('Storing token:', token);
      localStorage.setItem('jwtToken', token);
    }
  };
  
  export const getToken = () => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('jwtToken');
      console.log('Retrieved token:', token);
      return token;
    }
    return null;
  };
  
  export const removeToken = () => {
    if (typeof window !== 'undefined') {
      console.log('Removing token');
      localStorage.removeItem('jwtToken');
    }
  };
  