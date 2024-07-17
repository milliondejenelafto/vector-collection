import React from "react";
import "../../styles/global.css";
import logo from "../../assets/images/logo.png"; // Import the logo image

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Vector Collection</h1>
          <nav className="mt-2">
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
          </nav>
        </div>
        <div>
          <img src={logo} alt="Logo" className="h-10" /> {/* Logo image */}
        </div>
      </header>
      <main className="flex-grow container mx-auto p-4">{children}</main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>© {new Date().getFullYear()}, Built by Lafto Partners</p>
      </footer>
    </div>
  );
};

export default Layout;
