import axios from 'axios';
import { getAccessTokenFromCookie } from './token';
import { cookies } from 'next/headers';

const axiosInstance = axios.create({ baseURL: 'http://localhost:4200' });

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) =>
    Promise.reject(
      (error.response && error.response.data && error.response.data.message && error) ||
      'Something went wrong'
    )
);
axiosInstance.interceptors.request.use((config) => {
  const accessToken = getAccessTokenFromCookie(); // Retrieve the access token
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export default axiosInstance;
