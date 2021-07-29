import axios from "axios";

export const instance = axios.create({
  baseURL: "http://13.124.233.213",
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json,",
  },
});

instance.interceptors.request.use((config) => {
  // const accessToken = document.cookie.split('=')[1];
  // config.headers.common['Authorization'] = `${accessToken}`;
  return config;
});
