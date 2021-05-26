import axios from "axios";
import { saveToken } from "../reducers/auth";

const apiExport = () => {
  const api = axios.create({
    baseURL: `${process.env.API_URL}/`
  });

  //   api.interceptors.request.use((config) => {
  //     config.headers.authorization = `Bearer ${saveToken()}`;

  //     return config;
  //   });

  return api;
};

export default apiExport;
