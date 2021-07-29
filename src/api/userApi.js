import { instance } from "./index";

export const userApi = {
  login: (userInfo) => instance.post("/login", userInfo),
  loginCheck: () => instance.get("/token"),
  register: (userInfo) => instance.post("register", userInfo),
};
