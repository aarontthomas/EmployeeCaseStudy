// services/authService.js
import axios from "axios";

const API = import.meta.env.VITE_REACT_APP_BASE_URL;

export const register = async (credentials) => {
  return axios.post(`${API}/register`, credentials);
};

export const login = async (credentials) => {
  return axios.post(`${API}/login`, credentials);
};
