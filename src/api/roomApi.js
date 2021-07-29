import RoomList from "../pages/RoomList";
import { instance } from "./index";

export const roomApi = {
  getRoomList: () => instance.get("/rooms"),
  getOneRoom: (roomId) => instance.get(`/rooms/${roomId}/main`, roomId),
  addRoom: (room) => instance.post("/room", room),
  editRoom: (roomId, content) => instance.put("/room", { content }),
  joinRoom: () => instance.post("/room"),
  deleteRoom: (roomId) => instance.delete("/room"),
};
