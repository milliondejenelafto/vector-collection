import React, { createContext, useContext, useState, useEffect } from 'react';
import { checkAuth } from '../services/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchAuthStatus = async () => {
      const authStatus = await checkAuth();
      if (authStatus.isAuthenticated) {
        setUser(authStatus.user);
        setIsAuthenticated(true);
      }
    };

    fetchAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
