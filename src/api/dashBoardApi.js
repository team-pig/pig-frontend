import { instance } from "./index";

export const dashBoardApi = {
  loadAllStatus: (roomId) => instance.get(`/room/${roomId}/main/status`),
};
