// src/components/CartPage.jsx
import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function CartPage({ cartItems, onRemoveItem, updateCartItem }) {
  const navigate = useNavigate();

  // We can replicate increment/decrement logic
  const handleIncrement = (itemId) => {
    const item = cartItems.find((i) => i.id === itemId);
    if (item) {
      updateCartItem(itemId, item.quantity + 1);
    }
  };

  const handleDecrement = (itemId) => {
    const item = cartItems.find((i) => i.id === itemId);
    if (item) {
      // If quantity is 1, removing 1 would drop it to 0 => remove from cart
      if (item.quantity === 1) {
        onRemoveItem(itemId);
      } else {
        updateCartItem(itemId, item.quantity - 1);
      }
    }
  };

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

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
        <div>
          <div className="space-y-4 mb-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center bg-white p-4 shadow rounded"
              >
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
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
                <div className="flex items-center space-x-4">
                  <p className="font-bold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
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

          {/* Display total at the bottom */}
          <div className="bg-white p-4 shadow rounded">
            <h2 className="text-xl font-bold">
              Total: ${cartTotal.toFixed(2)}
            </h2>
          </div>
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
    }),
  ).isRequired,
  onRemoveItem: PropTypes.func.isRequired,
  updateCartItem: PropTypes.func.isRequired,
};

export default CartPage;
