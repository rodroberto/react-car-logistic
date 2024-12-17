import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Get the URL from the .env file
});

// Set up a request interceptor to attach the token to the Authorization header
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token'); // Retrieve token from localStorage
    if (token) {
      // Add the Authorization header to the request if the token exists
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
