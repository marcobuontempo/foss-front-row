import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
axios.defaults.headers.post["Content-Type"] = 'application/json';
axios.defaults.withCredentials = true;