// src/App.js
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./components/HomePage";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import ProductList from "./components/ProductList";
import CartPage from "./components/CartPage";

function App() {
  const [cartItems, setCartItems] = useState([]);

  const handleRemoveItem = (itemId) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId));
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout cartItems={cartItems}>
            <HomePage />
          </Layout>
        }
      />
      <Route
        path="/login"
        element={
          <Layout cartItems={cartItems}>
            <LoginForm />
          </Layout>
        }
      />
      <Route
        path="/register"
        element={
          <Layout cartItems={cartItems}>
            <RegisterForm />
          </Layout>
        }
      />
      <Route
        path="/products"
        element={
          <Layout cartItems={cartItems}>
            <ProductList />
          </Layout>
        }
      />
      <Route
        path="/cart"
        element={
          <Layout cartItems={cartItems}>
            <CartPage cartItems={cartItems} onRemoveItem={handleRemoveItem} />
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;
