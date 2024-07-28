// src/context/auth-context.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { checkAuth } from '../services/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchAuthStatus = async () => {
      try {
        const authStatus = await checkAuth();
        if (authStatus.isAuthenticated) {
          setIsAuthenticated(true);
          setUser(authStatus.user);
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
      }
    };

    fetchAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, setIsAuthenticated, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
