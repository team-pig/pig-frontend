import RoomList from "../pages/RoomList";
import { instance } from "./index";

export const roomApi = {
  getRoomList: () => instance.get("/rooms"),
  getOneRoom: (roomId) => instance.get(`/rooms/${roomId}/main`, roomId),
  addRoom: (room) => instance.post("/room", room),
  editRoom: (room) => {
    console.log(room);
    instance.put("/room", room);
  },

  joinRoom: () => instance.post("/room"),
  deleteRoom: (roomId) => {
    console.log(`roomId`, roomId);
    instance.delete("/room", {
      data: {
        roomId,
      },
    });
  },
};
