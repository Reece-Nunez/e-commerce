// src/components/ProductList.jsx
import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../api/productService';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch products');
      }
    };
    fetchProducts();
  }, []);

  if (error) return <p>{error}</p>;
  return (
    <div>
      <h3>Product List</h3>
      <ul>
        {products.map((prod) => (
          <li key={prod.id}>{prod.name} - ${prod.price}</li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
