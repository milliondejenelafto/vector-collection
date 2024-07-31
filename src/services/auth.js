import { navigate } from 'gatsby';

const API_URL = 'https://superlative-melba-d8c53c.netlify.app'; // Replace with your backend URL

export const checkAuth = async () => {
  try {
    const response = await fetch(`${API_URL}/auth/check-auth`, { credentials: 'include' });
    if (response.status === 401) {
      console.log('Unauthorized');
      return { isAuthenticated: false };
    }
    const data = await response.json();
    console.log('Auth Data:', data);
    return data;
  } catch (error) {
    console.error('Error checking auth status:', error);
    return { isAuthenticated: false };
  }
};

export const localLogin = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include', // Include cookies for session management
    });
    const data = await response.json();
    if (response.ok) {
      navigate('/');
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error('Error logging in:', error);
  }
};

export const googleLogin = () => {
  window.location.href = `${API_URL}/auth/google`; // Redirect to Google login
};

export const logout = async () => {
  try {
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: 'GET',
      credentials: 'include' // Include cookies for session management
    });
    if (response.ok) {
      localStorage.removeItem('user');
      navigate('/signin');
    } else {
      throw new Error('Failed to logout');
    }
  } catch (error) {
    console.error('Error logging out:', error);
  }
};
