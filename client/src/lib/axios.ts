import axios from 'axios';

// Server origin, e.g. https://api.yourdomain.com (set in Vercel env vars)
export const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8080').replace(/\/$/, '');

export const axiosInstance = axios.create({
  baseURL: `${API_URL}/api/v1`,
});
