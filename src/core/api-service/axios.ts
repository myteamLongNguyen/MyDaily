import axios, { AxiosError, AxiosResponse } from "axios";
import Cookie from "js-cookie";
import { cookieName } from "../utils/constants";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
    "x-api-key": process.env.REACT_APP_API_KEY,
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const cookies = Cookie.get(cookieName);
    if (cookies !== undefined) {
      config.headers.Authorization = `Bearer ${cookies}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse<any, any>): AxiosResponse<any, any> => {
    return response;
  },
  (error: AxiosError) => {
    // if (error.response && error.response.status === 401) {
    // Cookie.remove(cookieName);
    // }
    return Promise.reject(error);
  }
);

export default axiosInstance;
