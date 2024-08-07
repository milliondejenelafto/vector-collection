// src/components/Layout/Layout.js
import React, { useEffect, useState } from "react";
import { navigate } from "gatsby";
import { useAuth } from '../../context/auth-context';
import { removeToken } from '../../utils/auth';
import logo from "../../assets/images/logo.png"; // Import the logo image
import { logout } from '../../services/auth';

const API_URL = 'http://localhost:5000';

const Layout = ({ children }) => {
  const { isAuthenticated, user, setIsAuthenticated, setUser, loading } = useAuth();
  const [initialized, setInitialized] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      removeToken();
      setUser(null);
      setIsAuthenticated(false);
      navigate('/auth');
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch(`${API_URL}/auth/check-auth`, {
          credentials: 'include', // Include cookies
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
        
          const data = await response.json();
          console.log("here........")
          console.log(response)
          console.log(data)
          setIsAuthenticated(data.isAuthenticated);
          setUser(data.user);
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setInitialized(true);
      }
    };

    if (!initialized) {
      checkAuthStatus();
    }
  }, [initialized, setIsAuthenticated, setUser]);

  useEffect(() => {
    if (initialized && !loading && !isAuthenticated) {
      navigate('/auth');
    }
  }, [initialized, loading, isAuthenticated]);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-10 mr-3" /> {/* Logo image */}
          <h1 className="text-3xl font-bold">Vector Collection</h1>
        </div>
        <nav className="mt-2">
          {loading ? (
            <div className="text-gray-300">Loading...</div>
          ) : isAuthenticated ? (
            <>
              <a href="/" className="text-gray-300 hover:text-white mx-2">
                Home
              </a>
              <a href="/upload" className="text-gray-300 hover:text-white mx-2">
                Upload
              </a>
              <a href="/admin" className="text-gray-300 hover:text-white mx-2">
                Admin
              </a>
              <a href="/profile" className="text-gray-300 hover:text-white mx-2">
                Profile
              </a>
              <button
                onClick={handleLogout}
                className="text-gray-300 hover:text-white mx-2 bg-red-500 px-3 py-2 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <a
              href="/auth"
              className="text-gray-300 hover:text-white mx-2 bg-blue-500 px-3 py-2 rounded"
            >
              Sign In
            </a>
          )}
        </nav>
      </header>
      <main className="flex-grow container mx-auto p-4">{children}</main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>© {new Date().getFullYear()}, Built by Gado Assets</p>
      </footer>
    </div>
  );
};

export default Layout;
