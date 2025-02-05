// src/App.js
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./components/HomePage";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import ProductList from "./components/ProductList";
import ProtectedRoute from "./protectedRoute";
import CartPage from "./components/CartPage";
import AdminDashboard from "./components/AdminDashboard";
import "./index.css"; // Ensure TailwindCSS is working

function App() {
  // SINGLE SOURCE OF TRUTH for the cart
  const [cartItems, setCartItems] = useState([]);

  // Controls whether the sidebar is visible
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Add product to the cart or increment if it already exists
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
    // Open the sidebar automatically
    setIsCartOpen(true);
  };

  // Called by CartSidebar and CartPage for +/- changes
  const updateCartItem = (itemId, newQty) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === itemId ? { ...item, quantity: newQty } : item,
        )
        // Remove the item entirely if quantity goes to 0
        .filter((item) => item.quantity > 0),
    );
  };

  // Remove an entire item from cart (used on CartPage)
  const handleRemoveItem = (itemId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout
            cartItems={cartItems}
            updateCartItem={updateCartItem}
            isCartOpen={isCartOpen}
            setIsCartOpen={setIsCartOpen}
          >
            <HomePage />
          </Layout>
        }
      />
      <Route
        path="/login"
        element={
          <Layout
            cartItems={cartItems}
            updateCartItem={updateCartItem}
            isCartOpen={isCartOpen}
            setIsCartOpen={setIsCartOpen}
          >
            <LoginForm />
          </Layout>
        }
      />
      <Route
        path="/register"
        element={
          <Layout
            cartItems={cartItems}
            updateCartItem={updateCartItem}
            isCartOpen={isCartOpen}
            setIsCartOpen={setIsCartOpen}
          >
            <RegisterForm />
          </Layout>
        }
      />
      <Route
        path="/products"
        element={
          <Layout
            cartItems={cartItems}
            updateCartItem={updateCartItem}
            isCartOpen={isCartOpen}
            setIsCartOpen={setIsCartOpen}
          >
            {/* Pass addToCart to ProductList so it can add an item and auto-open the sidebar */}
            <ProductList addToCart={addToCart} />
          </Layout>
        }
      />
      <Route
        path="/cart"
        element={
          <Layout
            cartItems={cartItems}
            updateCartItem={updateCartItem}
            isCartOpen={isCartOpen}
            setIsCartOpen={setIsCartOpen}
          >
            {/*
              Pass cartItems + removeItem + updateCartItem to CartPage
              so we can see everything and do +/- or remove.
            */}
            <CartPage
              cartItems={cartItems}
              onRemoveItem={handleRemoveItem}
              updateCartItem={updateCartItem}
            />
          </Layout>
        }
      />

      <Route element={<ProtectedRoute allowedRoles={['ADMIN', 'MANAGER']} />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Route>
    </Routes>
  );
}

export default App;
