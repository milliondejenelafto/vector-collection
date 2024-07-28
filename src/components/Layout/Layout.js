import React, { useEffect, useState } from "react";
import { navigate } from "gatsby";
import "../../styles/global.css";
import logo from "../../assets/images/logo.png"; // Import the logo image
import { checkAuth, logout } from "../../services/auth";

const Layout = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUserLoginStatus = async () => {
      try {
        const authStatus = await checkAuth();
        if (authStatus.isAuthenticated) {
          setUser(authStatus.user);
          localStorage.setItem('user', JSON.stringify(authStatus.user));
        } else {
          const path = window.location.pathname;
          if (path !== '/auth' && path !== '/signup') {
            navigate('/auth'); // Redirect to sign-in page if not logged in and not on sign-in or sign-up page
          }
        }
      } catch (error) {
        console.error("Error checking user login status:", error);
        const path = window.location.pathname;
        if (path !== '/auth' && path !== '/signup') {
          navigate('/auth'); // Redirect to sign-in page on error if not on sign-in or sign-up page
        }
      }
    };

    checkUserLoginStatus();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem('user');
      setUser(null);
      navigate('/auth');
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-10 mr-3" /> {/* Logo image */}
          <h1 className="text-3xl font-bold">Vector Collection</h1>
        </div>
        <nav className="mt-2">
          {user ? (
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
            <>
              <a
                href="/auth"
                className="text-gray-300 hover:text-white mx-2 bg-blue-500 px-3 py-2 rounded"
              >
                Sign In
              </a>
              <a
                href="/signup"
                className="text-gray-300 hover:text-white mx-2 bg-green-500 px-3 py-2 rounded"
              >
                Sign Up
              </a>
            </>
          )}
        </nav>
      </header>
      <main className="flex-grow container mx-auto p-4">{children}</main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>© {new Date().getFullYear()}, Built by Lafto Partners</p>
      </footer>
    </div>
  );
};

export default Layout;
