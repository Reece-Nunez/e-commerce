// src/api/axiosClient.js
import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:5000/api', 
  withCredentials: true, // important to send cookies
});

// Optionally set default headers, interceptors, etc.
axiosClient.interceptors.request.use((config) => {
  // e.g., attach additional headers if needed
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosClient;
