import { instance } from "./index";

export const roomApi = {
  getRoomList: (page, size) =>
    instance.get("/rooms", {
      params: {
        page: page,
        size: size,
      },
    }),

  // getInviteCodeRoom: (inviteCode) => instance.get(`/rooms/room/${inviteCode}`),
  getInviteCodeRoom: (inviteCode) =>
    instance.get("/rooms/room/", {
      params: {
        inviteCode: inviteCode,
      },
    }),

  getOneRoom: (roomId) => instance.get(`/room/${roomId}/main`),

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
  getMarkedList: () => instance.get("/rooms/markedlist"),

  addBookmark: (roomId) => instance.post(`/room/${roomId}/bookmark`),
  deleteBookmark: (roomId) =>
    instance.delete(`/room/${roomId}/bookmark`, {
      data: {
        roomId,
      },
    }),
  searchRoom: (searchContent) => {
    return instance.get("/rooms/search", {
      params: {
        roomName: searchContent,
      },
    });
  },
};
