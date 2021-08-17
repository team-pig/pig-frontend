import io from "socket.io-client";
let socket;

const ENDPOINT = "http://localhost:4000";

export const initiateSocket = () => {
  socket = io(ENDPOINT, { transports: ["websocket"] });
  console.log(`Connecting socket...`);
  if (socket) socket.emit("join");
};
export const disconnectSocket = () => {
  console.log("Disconnecting socket...");
  if (socket) socket.disconnect();
};
export const subscribeToChat = (cb) => {
  if (!socket) return console.log("no socket");
  socket.on("message", (data) => {
    console.log("Websocket event received!");
    return cb(null, data);
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
