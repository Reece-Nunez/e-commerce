// src/components/Layout.jsx
import React from "react";
import { Link } from "react-router-dom";

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-xl font-bold text-navy">
            <Link to="/">My E-Commerce</Link>
          </div>
          <nav className="space-x-4">
            <Link to="/" className="hover:text-navy transition">
              Home
            </Link>
            <Link to="/login" className="hover:text-navy transition">
              Login
            </Link>
            <Link to="/register" className="hover:text-navy transition">
              Register
            </Link>
            {/* Possibly a cart icon or user icon here */}
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white shadow mt-8">
        <div className="max-w-7xl mx-auto px-4 py-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} My E-Commerce
        </div>
      </footer>
    </div>
  );
}

export default Layout;
