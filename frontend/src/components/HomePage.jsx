// HomePage.jsx
import React from "react";
import { Link } from "react-router-dom";
import heroImage from "../assets/images/hero-banner.jpeg";

function HomePage() {
  return (
    <section className="relative bg-cover bg-center bg-no-repeat min-h-[400px] flex items-center"
      style={{ backgroundImage: `url(${heroImage})` }}>
      <div className="bg-black/50 absolute inset-0"></div>
      <div className="relative z-10 max-w-4xl mx-auto text-center text-white px-4">
        <h1 className="text-4xl font-bold mb-4">Welcome to My E-Commerce</h1>
        <p className="text-xl mb-6">
          Shop the latest products, best deals, and more!
        </p>
        <Link
          to="/products"
          className="inline-block bg-navy hover:bg-blue-900 transition text-white px-6 py-3 rounded text-lg font-semibold"
        >
          View Products
        </Link>
      </div>
    </section>
  );
}

export default HomePage;
