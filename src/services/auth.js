import { navigate } from 'gatsby';
import { getToken } from '../utils/auth';
const API_URL = 'https://vector-collection-backend.vercel.app'; // Replace with your backend URL

export const checkAuth = async () => {
  try {
    const token = localStorage.getItem('token'); // Get token from local storage
    const response = await fetch(`${API_URL}/auth/check-auth`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Include the token in the headers
      },
    });
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
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('token', data.token); // Store the token in local storage
      return data.user; // Return user data
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error('Error logging in:', error);
    return null;
  }
};

export const googleLogin = () => {
  window.location.href = `${API_URL}/auth/google`; // Redirect to Google login
};

export const logout = async () => {
  try {
    localStorage.removeItem('token'); // Remove the token from local storage
    navigate('/auth');
  } catch (error) {
    console.error('Error logging out:', error);
  }
};
