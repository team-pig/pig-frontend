import RoomList from "../pages/RoomList";
import { instance } from "./index";

export const roomApi = {
  getRoomList: (page, size) =>
    instance.get("/rooms", {
      params: {
        page: page,
        size: size,
      },
    }),

  getOneRoom: (roomId) => instance.get(`/rooms/${roomId}/main`, roomId),
  addRoom: (room) => instance.post("/room", room),
  editRoom: (room) => {
    return instance.patch("/room", room);
  },

  joinRoom: (inviteCode) => instance.post("/room/member", inviteCode),

  deleteRoom: (roomId) => {
    instance.delete("/room", {
      data: {
        roomId,
      },
    });
  },
  exitRoom: (roomId) => {
    instance.delete(`/room/member/${roomId}`, {
      data: {
        roomId,
      },
    });
  },
  getMarkedList: () => {
    return instance.get("/rooms/markedlist");
  },
  getUnMarkedList: () => {
    return instance.get("rooms/unmarkedlist");
  },
  addBookmark: (roomId) => {
    return instance.post(`/room/${roomId}/bookmark`);
  },
  deleteBookmark: (roomId) => {
    instance.delete(`/room/${roomId}/bookmark`, {
      data: {
        roomId,
      },
    });
  },
  searchRoom: (searchContent) => {
    return instance.get("/rooms/search", {
      params: {
        roomName: searchContent,
      },
    });
  },
};
