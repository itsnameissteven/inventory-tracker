import axios from 'axios';

const api = axios.create({
  baseURL: process.env.DATABASE_URL || 'http://localhost:8080/',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject({
      message: error.response?.data?.message || error.message,
      status: error.response?.status,
    });
  }
);

export const setAuthToken = (token: string | undefined) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};
export default api;
