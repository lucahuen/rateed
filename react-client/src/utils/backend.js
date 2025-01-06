import axios from "axios";

const BackendURL = import.meta.env.VITE_BACKEND_URL | "";

const api = axios.create({
  baseURL: BackendURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
