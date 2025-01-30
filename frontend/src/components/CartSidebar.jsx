// src/components/CartSidebar.jsx
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function CartSidebar({ isOpen, onClose, cartItems, updateCartItem }) {
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  if (!isOpen) return null;

  const handleIncrement = (itemId) => {
    const item = cartItems.find((i) => i.id === itemId);
    if (item) {
      updateCartItem(itemId, item.quantity + 1);
    }
  };

  const handleDecrement = (itemId) => {
    const item = cartItems.find((i) => i.id === itemId);
    if (item) {
      updateCartItem(itemId, item.quantity - 1);
    }
  };

  return (
    <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
      >
        ✕
      </button>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between"
                >
                  <div>
                    <h4 className="font-semibold">{item.name}</h4>
                    <p className="text-gray-700">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <div className="mt-2 flex items-center space-x-2">
                      <button
                        onClick={() => handleDecrement(item.id)}
                        className="bg-gray-300 text-black px-2 py-1 rounded hover:bg-gray-400"
                      >
                        -
                      </button>
                      <span className="text-lg font-bold">{item.quantity}</span>
                      <button
                        onClick={() => handleIncrement(item.id)}
                        className="bg-gray-300 text-black px-2 py-1 rounded hover:bg-gray-400"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t pt-4">
              <h3 className="text-xl font-bold">
                Total: ${cartTotal.toFixed(2)}
              </h3>
            </div>
          </>
        )}

        <div className="mt-6">
          <Link
            to="/cart"
            onClick={onClose}
            className="block w-full text-center bg-navy text-white py-2 rounded hover:bg-blue-900 transition"
          >
            View Cart Details
          </Link>
        </div>
      </div>
    </div>
  );
}

CartSidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
    }),
  ).isRequired,
  updateCartItem: PropTypes.func.isRequired,
};

export default CartSidebar;
