import { navigate } from 'gatsby';
import { getToken } from '../utils/auth';
const API_URL = 'https://vector-collection-backend.vercel.app'; // Replace with your backend URL

export const checkAuth = async () => {
  const token = getToken();
  if (!token) {
    return { isAuthenticated: false };
  }

  try {
    const response = await fetch('https://vector-collection-backend.vercel.app/auth/check-auth', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.ok) {
      const data = await response.json();
      return { isAuthenticated: data.isAuthenticated, user: data.user };
    } else {
      return { isAuthenticated: false };
    }
  } catch (error) {
    console.error("Error checking auth status:", error);
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
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('token', data.token); // Store the JWT
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
    localStorage.removeItem('token'); // Remove the token
    localStorage.removeItem('user');
    navigate('/');
  } catch (error) {
    console.error('Error logging out:', error);
  }
};
