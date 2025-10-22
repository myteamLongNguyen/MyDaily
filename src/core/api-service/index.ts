import { AxiosRequestConfig } from "axios";
import axiosInstance from "./axios";

export const onGet = async (url: string, token?: string) => {
  let config: AxiosRequestConfig = {};
  if (token) {
    config = { headers: { Authorization: `Bearer ${token}` } };
  }
  const response = await axiosInstance.get(url, config);
  return response.data;
};

export const onPost = async (
  url: string,
  params?: object,
  token?: string,
  isFile?: boolean
) => {
  let config: AxiosRequestConfig = {
  };
  if (token) {
    config = { headers: { Authorization: `Bearer ${token}` } };
  }
  if (isFile) {
    config.headers = {
      ...config.headers,
      "Content-Type": "multipart/form-data",
    };
  }
  const response = await axiosInstance.post(url, params, config);
  return response.data;
};

export const onPatch = async (url: string, params?: object, token?: string, isFile?: boolean) => {
  let config: AxiosRequestConfig = {};
  if (token) {
    config = { headers: { Authorization: `Bearer ${token}` } };
  }
  if (isFile) {
    config.headers = {
      ...config.headers,
      "Content-Type": "multipart/form-data",
    };
  }
  const response = await axiosInstance.patch(url, params, config);
  return response.data;
};

export const onDelete = async (url: string, token?: string) => {
  let config: AxiosRequestConfig = {};
  if (token) {
    config = { headers: { Authorization: `Bearer ${token}` } };
  }
  const response = await axiosInstance.delete(url, config);
  return response.data;
};

export const onDownload = async (url: string, token?: string) => {
  let config: AxiosRequestConfig = {
    responseType: 'blob', // binary data
  };
  if (token) {
    config.headers = { Authorization: `Bearer ${token}` };
  }
  const response = await axiosInstance.get(url, config);
  return response.data;
};
