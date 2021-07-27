import RoomList from "../pages/RoomList";
import { instance } from "./index";

export const roomApi = {
  getRoomList: (roomList) => instance.get("/rooms", roomList),
  getOneRoom: (roomId) => instance.get(`/rooms/${roomId}/main`, roomId),
  addRoom: (room) => instance.post("/room", room),
};
