// src/components/CartPage.jsx
import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function CartPage({ cartItems, onRemoveItem }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 text-black p-6">
      <button
        className="mb-4 text-navy font-semibold underline"
        onClick={() => navigate(-1)}
      >
        Back to Shopping
      </button>

      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-white p-4 shadow rounded"
            >
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p>Qty: {item.quantity}</p>
              </div>
              <div className="flex items-center space-x-4">
                <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

CartPage.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
  onRemoveItem: PropTypes.func.isRequired,
};

export default CartPage;
