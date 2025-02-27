import axios from 'axios';

const baseURL= import.meta.env.VITE_API_BASE_URL;
const api = axios.create({
    baseURL, // Your API's base URL
    timeout: 10000, // Timeout in milliseconds
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}` // example of authentication header.
    },
  });

  api.interceptors.request.use(
    (config) => {
      // Modify the request config here
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      console.log('Request sent:', config);
      return config; // Must return the config
    },
    (error) => {
      // Handle request errors
      console.error('Request error:', error);
      return Promise.reject(error);
    }
  );
  api.interceptors.response.use(
    (response) => {
    
      console.log('Response received:', response);
      return response; // Must return the response
    },
    (error) => {
      // Handle response errors
      console.error('Response error:', error);
      if (error.response && error.response.status === 401) {
        // Handle unauthorized access (e.g., redirect to login)
        console.log("unauthorized access, redirecting to login");
        //example: window.location.href = "/login";
      }
      return Promise.reject(error);
    }
  );
export default api;