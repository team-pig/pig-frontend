import axios from "axios";
import { cookies } from "../shared/cookie";

export const instance = axios.create({
  baseURL: "http://13.124.233.213",
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json,",
  },
});

instance.interceptors.request.use((config) => {
  const accessToken = cookies.get("accessToken");
  config.headers.common["Authorization"] = `Bearer ${accessToken}`;
  return config;
});
