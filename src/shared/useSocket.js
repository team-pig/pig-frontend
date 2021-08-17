import io from "socket.io-client";
let socket;

const ENDPOINT = "http://localhost:4000";

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
  if (socket) socket.emit("sendMessage", { roomId, nickname, text });
};
export const joinRoom = (roomId, nickname) => {
  if (socket && roomId && nickname) {
    socket.emit("joinRoom", { roomId, nickname });
  }
};
export const leaveRoom = (roomId, nickname) => {
  if (socket && roomId && nickname)
    socket.emit("leaveRoom", { roomId, nickname });
};
