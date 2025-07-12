import axios from 'axios';

const VITE_BACKEND_LOCALHOST_API_URL = import.meta.env.VITE_BACKEND_API_URL;

const api = axios.create({
  baseURL: VITE_BACKEND_LOCALHOST_API_URL,
});

// ✅ Register API
export const register = async (formData) => {
  try {
    const response = await api.post('/register', formData);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || 'Registration failed');
    }
    throw new Error('Network error during registration');
  }
};

// ✅ Login API (just a placeholder)
export const login = async (credentials) => {
  try {
    const response = await api.post('/login', credentials);
    console.log("🚀 ~ login ~ response.data:", response.data)
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || 'Login failed');
    }
    throw new Error('Network error during login');
  }
};
export const timerLog = async (data) => {
  try {
    const response = await api.post('/timer/logtimer', data);
    return response.data;
  } catch (error) {
    console.error("❌ Error logging timer:", error.response?.data || error.message);
    throw error; // rethrow so the caller can handle it
  }
};
