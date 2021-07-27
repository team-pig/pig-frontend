import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { roomApi } from "../api/roomApi";

//action
const ADD_ROOM = "room/ADD_ROOM";
const GET_ROOM_LIST = "room/GET_ROOM_LIST";
const GET_ONE_ROOM = "room/GET_ONE_ROOM";
const LOADING = "LOADING";

//initialState
const initialState = {
  roomList: [],
  room: null,
  willAddRoom: null,
};

//action creator
export const addRoom = createAction(ADD_ROOM, (room) => ({ room }));
export const getRoomList = createAction(GET_ROOM_LIST, (roomList) => ({
  roomList,
}));
export const getOneRoom = createAction(GET_ONE_ROOM, (roomId) => ({
  roomId,
}));
export const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

//thunk function
export const __addRoom =
  (contents) =>
  async (dispatch, getState, { history }) => {
    try {
      const { imgUrl } = getState().image;
      const willDispatchContents = {
        ...contents,
        roomIamge: imgUrl,
      };
      console.log(willDispatchContents);
      //api post
      const { data } = await roomApi.addRoom(willDispatchContents);
      dispatch(addRoom(data));
    } catch (e) {
      console.log(e);
    }
  };

export const __getRoomList =
  () =>
  async (dispatch, getState, { history }) => {
    try {
    } catch (e) {}
  };

export const __getOneRoom =
  (roomId) =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await roomApi.getOneRoom(roomId);
      dispatch(getOneRoom(data));
    } catch (e) {
      console.log(e);
    }
  };

//reducer
const room = handleActions(
  {
    [ADD_ROOM]: (state, action) =>
      produce(state, (draft) => {
        draft.roomList.unshift(action.payload.room);
      }),
  },
  initialState
);

export default room;
