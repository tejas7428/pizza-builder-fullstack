import axios from 'axios';

const API_BASE_URL = '/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid, logout user
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const register = (userData) => api.post('/auth/register', userData);
export const login = (credentials) => api.post('/auth/login', credentials);
export const logout = () => api.post('/auth/logout');
export const verifyEmail = (token) => api.get(`/auth/verify-email?token=${token}`);
export const forgotPassword = (email) => api.post('/auth/forgot-password', { email });
export const resetPassword = (data) => api.post('/auth/reset-password', data);

// Menu APIs
export const getMenu = () => api.get('/menu');

// Order APIs
export const createOrder = (orderData) => api.post('/orders', orderData);
export const getUserOrders = () => api.get('/orders');
export const getOrder = (id) => api.get(`/orders/${id}`);

// Admin APIs
export const getInventory = () => api.get('/admin/inventory');
export const updateInventoryItem = (id, data) => api.put(`/admin/inventory/${id}`, data);
export const getAdminOrders = () => api.get('/admin/orders');
export const updateOrderStatus = (id, status) => api.put(`/admin/orders/${id}/status`, { status });

// Payment APIs
export const createRazorpayOrder = (amount) => api.post('/payments/create-order', { amount });
export const verifyPayment = (data) => api.post('/payments/verify-payment', data);

export default api;