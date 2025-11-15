import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
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

// Auth API
export const authAPI = {
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('localLensUser', JSON.stringify(response.data));
    }
    return response.data;
  },
  
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('localLensUser', JSON.stringify(response.data));
    }
    return response.data;
  },
  
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('localLensUser');
  },
};

// Places API
export const placesAPI = {
  getAll: async (params) => {
    const response = await api.get('/places', { params });
    return response.data;
  },
  
  getById: async (id) => {
    const response = await api.get(`/places/${id}`);
    return response.data;
  },
  
  add: async (placeData) => {
    const response = await api.post('/places/add', placeData);
    return response.data;
  },
};

export default api;
