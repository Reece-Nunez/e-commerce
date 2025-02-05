// App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./components/HomePage";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import ProductList from "./components/ProductList";
import ProtectedRoute from "./protectedRoute";
import "./index.css"; // Ensure TailwindCSS is working

function App() {
  return (
    <Routes>
      {/* Home Route */}
      <Route
        path="/"
        element={
          <Layout>
            <HomePage />
          </Layout>
        }
      />

      {/* Login Route */}
      <Route
        path="/login"
        element={
          <Layout>
            <LoginForm />
          </Layout>
        }
      />

      {/* Register Route */}
      <Route
        path="/register"
        element={
          <Layout>
            <RegisterForm />
          </Layout>
        }
      />

      <Route
        path="/products"
        element={
          <Layout>
            <ProductList />
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
