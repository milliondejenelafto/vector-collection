// src/context/auth-context.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { checkAuth } from '../services/auth';
import { getToken, setToken, removeToken } from '../utils/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = getToken();
      if (token) {
        const authStatus = await checkAuth();
        if (authStatus.isAuthenticated) {
          setUser(authStatus.user);
          setIsAuthenticated(true);
        }
      }
      setLoading(false);
    };

    const captureTokenFromURL = () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get('token');
      if (token) {
        setToken(token);
        window.history.replaceState({}, document.title, window.location.pathname); // Remove token from URL
        initializeAuth();
      } else {
        initializeAuth();
      }
    };

    captureTokenFromURL();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, setIsAuthenticated, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
