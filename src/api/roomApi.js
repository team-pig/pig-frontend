import RoomList from "../pages/RoomList";
import { instance } from "./index";

export const roomApi = {
  getRoomList: (roomList) => instance.get("api/rooms", roomList),
  getOneRoom: (roomId) => instance.get("api/rooms/:roomId/main", roomId),
  addRoom: (room) => instance.post("api/room", room),
};
