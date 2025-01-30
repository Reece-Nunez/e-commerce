// src/components/ProductList.jsx
import React, { useEffect, useState } from "react";
import { getAllProducts } from "../api/productService";
import CartSidebar from "./CartSidebar";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [error, setError] = useState(null);

  // Fetch products on component load
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch products");
      }
    };
    fetchProducts();
  }, []);

  // Add product to the cart
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        // Increment quantity if item already exists
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        // Add new item with quantity of 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });

    setIsCartOpen(true); // Open cart sidebar when an item is added
  };

  // Decrement item quantity or remove from cart if quantity reaches 0
  const decrementItemQuantity = (productId) => {
    setCartItems((prevItems) => {
      return prevItems
        .map((item) => {
          if (item.id === productId) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        })
        .filter((item) => item.quantity > 0); // Remove item if quantity reaches 0
    });
  };

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h3 className="text-2xl font-bold mb-6">Product List</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((prod) => (
          <div
            key={prod.id}
            className="bg-white rounded shadow p-4 flex flex-col"
          >
            {/* Product Image */}
            <div className="mb-2">
              {prod.imageURL ? (
                <img
                  src={prod.imageURL}
                  alt={prod.name}
                  className="w-full h-48 object-cover rounded"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 rounded flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
            </div>

            {/* Product Details */}
            <h4 className="font-semibold text-lg mb-1">{prod.name}</h4>
            <p className="text-gray-600 flex-1">{prod.description}</p>
            <p className="font-bold mt-2">${prod.price}</p>

            {/* Add to Cart Button */}
            <button
              className="mt-4 bg-navy text-white py-2 rounded hover:bg-blue-900 transition"
              onClick={() => addToCart(prod)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Cart Sidebar */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        decrementItemQuantity={decrementItemQuantity}
      />
    </div>
  );
}

export default ProductList;
