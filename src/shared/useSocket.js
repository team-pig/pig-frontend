import io from "socket.io-client";
import moment from "moment";

let socket;

// const ENDPOINT = "https://itda.shop:443";
const ENDPOINT = "http://13.125.222.70:3000";

// 웹사이트에 들어올 때 소켓 연결
export const initiateSocket = () => {
  socket = io(ENDPOINT, { transports: ["websocket"] });
  // console.log("🤝🏻소켓연결!");
  // console.log(socket);
};
// 웹사이트에서 나갈 때 소켓 연결 끊음
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    // console.log("🔪연결끝");
  }
};
// 채팅 구독하기(전역적 구독. 방마다 구독X. 방마다 보내지는건 서버가 할 일)
export const subscribeToChat = (cb) => {
  if (!socket) return;
  socket.on("message", (data) => {
    return cb(null, data);
  });
};
// DB에 저장된 이 방의 메시지 받기
export const getMessages = (cb) => {
  if (!socket) return;
  socket.on("messages", (messages) => {
    // console.log(messages);
    return cb(null, messages);
  });
};
// 메시지 보내기
export const sendMessage = (roomId, nickname, userId, text) => {
  if (socket) {
    const submitTime = moment().format("YYYY.MM.DD.ddd/a h:mm");
    socket.emit("sendMessage", {
      roomId,
      userName: nickname,
      userId,
      text,
      submitTime,
    });
  }
};
// 방에 참여하기
export const joinRoom = (roomId, nickname, userId, roomName) => {
  if (socket && roomId && nickname && userId && roomName) {
    socket.emit("join", { roomId, userName: nickname, userId, roomName });
    // console.log("🏃🏻‍♀️socket - join room");
  }
};
// 참여했던 방에서 나가기(단순 나가기)
export const leaveRoom = (roomId, nickname, userId) => {
  if (socket && roomId && nickname && userId) {
    socket.emit("leave", { roomId, userName: nickname, userId });
    socket.off("messages");
  }
  // console.log("🖐🏻socket - leave room");
};
// 인포메세지 받기
export const subscribeInfoText = (cb) => {
  if (!socket) return;
  socket.on("info", (infoText) => {
    return cb(null, infoText);
  });
};
// 경고메세지 받기
export const subscribeWarning = (cb) => {
  if (!socket) return;
  socket.on("warning", (warning) => {
    return cb(null, warning);
  });
};
