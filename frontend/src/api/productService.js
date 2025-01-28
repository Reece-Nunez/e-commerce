// src/api/productService.js
import axiosClient from "./axiosClient";

export const getAllProducts = async () => {
  const response = await axios.get("http://localhost:5000/api/products");
  return response.data;
};

export const createProduct = async (data) => {
  // admin only route
  const res = await axiosClient.post("/products", data);
  return res.data;
};
