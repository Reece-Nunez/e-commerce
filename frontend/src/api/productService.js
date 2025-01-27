// src/api/productService.js
import axiosClient from "./axiosClient";

export const getAllProducts = async () => {
  const res = await axiosClient.get("/products");
  return res.data; // array of products
};

export const createProduct = async (data) => {
  // admin only route
  const res = await axiosClient.post("/products", data);
  return res.data;
};
