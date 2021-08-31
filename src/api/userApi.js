import { instance, nonTokenInstance } from "./index";

export const userApi = {
  loginCheck: () => instance.get("/token"),
  login: (userInfo) => nonTokenInstance.post("/login", userInfo),
  register: (userInfo) => nonTokenInstance.post("register", userInfo),
  resetPassword: (email) =>
    instance.post("resetPassword/sendEmail", {
      email,
    }),
  modifyTutorialStatus: (info) => instance.patch("/tutorial", info),
  submitNewPassword: (id, resetInfo) =>
    instance.post(`/resetPassword/${id}`, resetInfo),
};
