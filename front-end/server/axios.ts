import axios from 'axios';
import { getUserToken } from '~/services/session.server';

const api = axios.create({
  baseURL: process.env.DATABASE_URL || 'http://localhost:8080/',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});
export const setAuthToken = (token: string | undefined) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};
export default api;
