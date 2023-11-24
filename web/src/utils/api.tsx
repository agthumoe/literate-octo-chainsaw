import axios from "axios";

const api = axios.create();
api.interceptors.request.use((config) => {
  config.baseURL = process.env.NEXT_PUBLIC_API_URL;
  return config;
});

export default api;
