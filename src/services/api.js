import axios from "axios";


const apiUrl = import.meta.env.VITE_BACKEND_URL||"https://e-commerce-backend-2-cuuu.onrender.com";

const API = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token dynamically before each request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
