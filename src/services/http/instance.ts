import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:80/",
  timeout: 1200,
});

instance.interceptors.request.use((config) => {
  const _config = { ...config };
  const token = localStorage.getItem("token");

  if (token) {
    _config.headers = {
      ...config.headers,
      authorization: "Bearer " + token,
    };
  }

  return _config;
});

export default instance;
