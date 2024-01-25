import axios from "axios";

// Defaults
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
axios.defaults.headers.post["Content-Type"] = 'application/json';
axios.defaults.withCredentials = true;

// Custom response handler
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response &&
      error.response.status === 401 &&
      error.response?.data?.errors === 'invalid token') {
      // Handle invalid token response - redirect to /logout with 'expired' param
      document.location.href = "/logout?expired=true"
    }
    return Promise.reject(error);
  }
)

export default axios;