// src/components/CartSidebar.jsx
import React from "react";
import PropTypes from "prop-types";

function CartSidebar({ isOpen, onClose, cartItems, decrementItemQuantity }) {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out z-50`}
    >
      <div className="p-4 border-b flex justify-between items-center">
        <h3 className="text-lg font-bold">Your Cart</h3>
        <button className="text-red-500 text-sm" onClick={onClose}>
          Close
        </button>
      </div>
      <div className="p-4">
        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className="mb-4 flex items-center">
                <img
                  src={item.imageURL}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="ml-4 flex-1">
                  <h4 className="font-semibold">{item.name}</h4>
                  <p className="text-gray-600">${item.price}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <button
                  className="text-red-500 ml-4"
                  onClick={() => decrementItemQuantity(item.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

// Define prop types
CartSidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      imageURL: PropTypes.string,
      quantity: PropTypes.number.isRequired,
    }),
  ).isRequired,
  decrementItemQuantity: PropTypes.func.isRequired,
};

export default CartSidebar;
