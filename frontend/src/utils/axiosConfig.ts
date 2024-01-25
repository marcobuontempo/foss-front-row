import axios from "axios";
import { toast } from "react-toastify";

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
      document.location.href = "/logout?expired=true";
    } else if (error.code === "ERR_NETWORK") {
      // Handle backend server downtime
      toast.error("Server error, please try again later!");
    }
    return Promise.reject(error);
  }
)

export default axios;