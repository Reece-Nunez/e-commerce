// components/Layout.jsx
import React from "react";
import { Link } from "react-router-dom";

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      {/* Navigation Bar */}
      <header className="bg-navy text-white py-4">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-xl font-bold">My E-Commerce</h1>
          <nav>
            <Link className="px-4 hover:underline" to="/">
              Home
            </Link>
            <Link className="px-4 hover:underline" to="/login">
              Login
            </Link>
            <Link className="px-4 hover:underline" to="/register">
              Register
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 My E-Commerce. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
