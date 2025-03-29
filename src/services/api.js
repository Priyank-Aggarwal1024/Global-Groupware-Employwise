import axios from "axios";

const BASE_URL = "https://reqres.in/api";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const loginUser = (email, password) =>
  api.post("/login", { email, password });

export const getUsers = async (page = 1) => {
  return await api.get(`/users?page=${page}`);
};

export const updateUser = async (userId, userData) => {
  return await api.put(`/users/${userId}`, userData);
};

export const deleteUser = async (userId) => {
  return await api.delete(`/users/${userId}`);
};

export const registerUser = (email, password) =>
  api.post("/register", { email, password });

export const getUserById = async (id) => {
  return await api.get(`/users/${id}`);
};

export default api;
