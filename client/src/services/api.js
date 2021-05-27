// libraries
import axios from "axios";

// utils
import { getJWT } from "../utils/jwt";

const apiExport = () => {
  const api = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}`
  });

  api.interceptors.request.use((config) => {
    config.headers.authorization = `Bearer ${getJWT()}`;

    return config;
  });

  return api;
};

export default apiExport;
