import axios from 'axios';

import { getToken } from './auth';

const api = axios.create({
  // baseURL: 'https://upload-arquivos-backend.herokuapp.com',
  // baseURL: 'upload-arquivos-backend.herokuapp.com',

  baseURL: 'http://localhost:3000',
});

api.interceptors.request.use(async (config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
