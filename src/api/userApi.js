import { instance } from "./index";

export const userApi = {
  login: () => instance.get("/user"),
  loginCheck: () => instance.get("/api/login"),
};
