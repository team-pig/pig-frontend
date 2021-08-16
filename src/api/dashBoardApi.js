import { instance } from "./index";

export const dashBoardApi = {
  loadAllStatus: (roomId) => instance.get(`/room/${roomId}/main/status`),
  editMyProfile: (roomId, willReqParams) =>
    instance.patch(`/room/${roomId}/myprofile`, willReqParams),

  loadAllRoomInfo: (roomId) => instance.get(`/room/${roomId}/main`),
  editRoomInfos: (newRoomInfos) => instance.patch("/room", newRoomInfos),
};
