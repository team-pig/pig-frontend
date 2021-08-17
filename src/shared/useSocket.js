import io from "socket.io-client";
let socket;

const ENDPOINT = "http://13.125.222.70:3000";

export const initiateSocket = () => {
  socket = io(ENDPOINT, { transports: ["websocket"] });
};
export const disconnectSocket = () => {
  if (socket) socket.disconnect();
};
export const subscribeToChat = (cb) => {
  if (!socket) return;
  socket.on("message", (data) => {
    return cb(null, data);
  });
};
export const getMessages = (cb) => {
  if (!socket) return;
  socket.on("messages", (messages) => {
    return cb(null, messages);
  });
};
export const sendMessage = (roomId, nickname, text) => {
  if (socket) socket.emit("sendMessage", { roomId, userName: nickname, text });
};
export const joinRoom = (roomId, nickname, userId) => {
  if (socket && roomId && nickname && userId) {
    socket.emit("join", { roomId, userName: nickname, userId });
  }
};
export const leaveRoom = (roomId, nickname, userId) => {
  if (socket && roomId && nickname && userId)
    socket.emit("leave", { roomId, userName: nickname, userId });
};
