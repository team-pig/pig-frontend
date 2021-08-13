import { instance } from "./index";

export const dashBoardApi = {
  loadAllStatus: (roomId) => instance.get(`/room/${roomId}/main/status`),
  editMyProfile: (roomId, newMyProfile) =>
    instance.patch(`/room/${roomId}/myprofile`, { newMyProfile }),

  loadAllRoomInfo: (roomId) => instance.get(`/room/${roomId}/main`),
  editRoomInfos: (newRoomInfos) => instance.patch("/room", newRoomInfos),
};
