// libraries
import axios from "axios";

// utils
import { getJWT, clearJWT } from "../utils/jwt";

const apiExport = () => {
  const api = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}`
  });

  api.interceptors.request.use((config) => {
    config.headers.authorization = `Bearer ${getJWT()}`;

    return config;
  });

  const UNAUTHORIZED = 401;

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === UNAUTHORIZED) {
        clearJWT();
      } else {
        return Promise.reject(error);
      }
    }
  );

  return api;
};

export default apiExport;
