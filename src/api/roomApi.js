import RoomList from "../pages/RoomList";
import { instance } from "./index";

export const roomApi = {
  getRoomList: (roomList) => instance.get('api/rooms', roomList),
  addRoom: (room) => instance.post('api/room', room); 
};
