// src/components/LoginForm.jsx
import React, { useState } from "react";
import { loginUser, getProfile } from "../api/authService";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginUser(email, password);
      const profileData = await getProfile();
      setUserInfo(profileData);
      setError(null);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Login failed");
    }
  };

  if (userInfo) {
    return (
      <div className="p-6 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-4">
          Welcome, {userInfo.email}!
        </h2>
        <p>Your role: {userInfo.role}</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded shadow p-6">
      <h2 className="text-2xl font-bold mb-4 text-navy">Login</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="bg-navy text-white px-4 py-2 rounded hover:bg-blue-900 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
