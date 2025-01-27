// src/api/authService.js
import axiosClient from "./axiosClient";

// Sign up a new user
export const signupUser = async (email, password) => {
  const response = await axiosClient.post("/users/signup", {
    email,
    password,
  });
  // The JWT is automatically set in an HTTP-only cookie if successful
  return response.data;
};

// Login user
export const loginUser = async (email, password) => {
  const response = await axiosClient.post("/users/login", {
    email,
    password,
  });
  return response.data;
};

// Logout user
export const logoutUser = async () => {
  const response = await axiosClient.post("/users/logout");
  return response.data;
};

// Get logged-in user's profile
export const getProfile = async () => {
  const response = await axiosClient.get("/users/profile");
  return response.data;
};
