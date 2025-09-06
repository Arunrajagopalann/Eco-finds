import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getCurrentUser: () => api.get('/auth/me'),
};

// Products API
export const productsAPI = {
  getProducts: async (params) => {
    const response = await api.get('/products', { params });
    // Handle both old and new response structures
    return {
      data: response.data.products || response.data
    };
  },
  getProduct: (id) => api.get(`/products/${id}`),
  createProduct: (formData) => api.post('/products', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
  updateProduct: (id, formData) => api.put(`/products/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
  deleteProduct: (id) => api.delete(`/products/${id}`),
  getMyListings: () => api.get('/products/user/my-listings'),
  searchProducts: async (params) => {
    const response = await api.get('/products', { params });
    // Handle both old and new response structures
    return {
      data: response.data.products || response.data
    };
  }
};

// Users API
export const usersAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (profileData) => api.put('/users/profile', profileData),
  getCart: () => api.get('/users/cart'),
  addToCart: (productId, quantity) => api.post('/users/cart/add', { productId, quantity }),
  removeFromCart: (productId) => api.delete(`/users/cart/remove/${productId}`),
  getOrders: () => api.get('/users/orders'),
};

export default api;
