// src/components/Layout.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import CartSidebar from "./CartSidebar";
import PropTypes from "prop-types";

function Layout({ children, cartItems }) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      {/* Navigation Bar */}
      <header className="bg-navy text-white py-4">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-xl font-bold">My E-Commerce</h1>
          <nav className="flex items-center">
            <Link className="px-4 hover:underline" to="/">
              Home
            </Link>
            <Link className="px-4 hover:underline" to="/login">
              Login
            </Link>
            <Link className="px-4 hover:underline" to="/register">
              Register
            </Link>
            <button
              onClick={handleCartToggle}
              className="ml-4 bg-white text-navy font-semibold py-2 px-4 rounded hover:bg-gray-200 transition"
            >
              Preview Cart
            </button>
            <Link
              to="/cart"
              className="ml-4 bg-white text-navy font-semibold py-2 px-4 rounded hover:bg-gray-200 transition"
            >
              View Cart
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

      {/* Cart Sidebar */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={handleCartToggle}
        cartItems={cartItems}
      />
    </div>
  );
}

// Define prop types
Layout.propTypes = {
  children: PropTypes.node.isRequired,
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default Layout;
