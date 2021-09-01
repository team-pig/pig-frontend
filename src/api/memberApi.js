import { instance } from "./index";

export const memberApi = {
  loadMembers: (roomId) => instance.get(`/room/${roomId}/members`),
};
