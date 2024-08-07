import { navigate } from 'gatsby';
import {removeToken} from '../utils/auth'
const API_URL = 'http://localhost:5000';

export const checkAuth = async () => {
  try {
    const response = await fetch(`${API_URL}/auth/check-auth`, {
      credentials: 'include', // Include cookies
      headers: {
        'Content-Type': 'application/json',
      },
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
      body: JSON.stringify({ email, password }),
      credentials: 'include', // Include cookies
    });
    const data = await response.json();
    if (response.ok) {
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
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: 'GET',
      credentials: 'include',
    });
    if (response.ok) {
      removeToken(); // Remove the token from cookies
      navigate('/auth');
    } else {
      throw new Error('Failed to logout');
    }
  } catch (error) {
    console.error('Error logging out:', error);
  }
};
// Fetch user profile
export const fetchUserProfile = async () => {
  try {
    const response = await fetch(`${API_URL}/auth/user`, {
      method: 'GET',
      credentials: 'include', // Include cookies
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user profile');
    }

    const data = await response.json();
    console.log("data.........")
    console.log(data)
    return data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

// Fetch user vectors
export const fetchUserVectors = async () => {
  try {
    const response = await fetch(`${API_URL}/vector/user-vectors`, {
      method: 'GET',
      credentials: 'include', // Include cookies
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user vectors');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user vectors:', error);
    throw error;
  }
};
