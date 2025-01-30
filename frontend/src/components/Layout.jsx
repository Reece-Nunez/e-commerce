// src/components/Layout.jsx
import React from "react";
import { Link } from "react-router-dom";
import CartSidebar from "./CartSidebar";
import PropTypes from "prop-types";

function Layout({
  children,
  cartItems,
  updateCartItem,
  isCartOpen,
  setIsCartOpen,
}) {
  // We could still allow manual toggle if you want, but let's assume we only
  // open sidebar automatically from addToCart. We do need an onClose though.
  const closeSidebar = () => {
    setIsCartOpen(false);
  };

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
            <Link className="px-4 hover:underline" to="/products">
              Products
            </Link>
            {/* Instead of toggling the sidebar, go to the CartPage */}
            <Link
              className="bg-white text-navy font-semibold py-2 px-4 rounded hover:bg-gray-200 transition"
              to="/cart"
            >
              Cart
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">{children}</main>

      {/* Cart Sidebar opens automatically (from addToCart) if isCartOpen is true */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={closeSidebar}
        cartItems={cartItems}
        updateCartItem={updateCartItem}
      />

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 My E-Commerce. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  cartItems: PropTypes.array.isRequired,
  updateCartItem: PropTypes.func.isRequired,
  isCartOpen: PropTypes.bool.isRequired,
  setIsCartOpen: PropTypes.func.isRequired,
};

export default Layout;
