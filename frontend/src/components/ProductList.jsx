// src/components/ProductList.jsx
import React, { useEffect, useState } from "react";
import { getAllProducts } from "../api/productService";
import PropTypes from "prop-types";

function ProductList({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

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

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

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
    </div>
  );
}

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
  addToCart: PropTypes.func.isRequired,
  allowedRoles: PropTypes.func.isRequired,
};

export default ProductList;
