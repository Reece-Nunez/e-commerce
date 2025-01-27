// App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <HomePage />
          </Layout>
        }
      />
      <Route
        path="/login"
        element={
          <Layout>
            <LoginForm />
          </Layout>
        }
      />
      <Route
        path="/register"
        element={
          <Layout>
            <RegisterForm />
          </Layout>
        }
      />
    </Routes>
  );
}

function HomePage() {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Home Page!</h1>
      <p className="text-gray-600">
        Discover our latest products, browse categories, and more.
      </p>
    </div>
  );
}

export default App;
