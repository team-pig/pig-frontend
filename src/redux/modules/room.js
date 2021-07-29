import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { roomApi } from "../../api/roomApi";
import { setPreview, uploadImageToS3 } from "./image";

//action
const ADD_ROOM = "room/ADD_ROOM";
const GET_ROOM_LIST = "room/GET_ROOM_LIST";
const GET_ONE_ROOM = "room/GET_ONE_ROOM";
const EDIT_ROOM = "room/EDIT_ROOM";
const DELETE_ROOM = "room/DELETE_ROOM";
const JOIN_ROOM = "room/JOIN_ROOM";
const LOADING = "LOADING";

//initialState
const initialState = {
  roomList: [],
  room: [],
  isLoading: null,
};

//action creator
export const addRoom = createAction(ADD_ROOM, (room) => ({ room }));
export const getRoomList = createAction(GET_ROOM_LIST, (roomList) => ({
  roomList,
}));
export const getOneRoom = createAction(GET_ONE_ROOM, (roomId) => ({
  roomId,
}));
export const editRoom = createAction(EDIT_ROOM, (newContent) => ({
  newContent,
}));
export const deleteRoom = createAction(DELETE_ROOM, (roomId) => ({ roomId }));
export const joinRoom = createAction(JOIN_ROOM, (inviteCode) => ({
  inviteCode,
}));
export const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

//thunk function
export const __joinRoom =
  (inviteCode) =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await roomApi.joinRoom();
      dispatch(joinRoom(data));
    } catch (e) {
      console.log(e);
    }
  };

export const __addRoom =
  (contents) =>
  async (dispatch, getState, { history }) => {
    try {
      const _image = getState().image.preview;
      const willDispatchContents = {
        ...contents,
        roomImage: _image,
      };
      console.log(willDispatchContents);
      //api post
      const { data } = await roomApi.addRoom(willDispatchContents);
      dispatch(addRoom(data));
      // dispatch(addRoom(willDispatchContents));
    } catch (e) {
      console.log(e);
    }
  };

export const __editRoom =
  (roomId, contents, isEdit) =>
  async (dispatch, getState, { history }) => {
    try {
      const _image = getState().image.preview;
      const newContent = {
        ...contents,
        roomImage: _image,
        roomId,
      };

      console.log(newContent);
      console.log(roomId);
      await roomApi.editRoom(newContent);
      dispatch(editRoom(newContent));
      // dispatch(editRoom(roomId, willDispatchContents));
    } catch (e) {
      console.log(e);
    }
  };

export const __getRoomList =
  () =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await roomApi.getRoomList();
      dispatch(getRoomList(data));
      // const data = getState().room.roomList;
      // dispatch(getRoomList(data));
    } catch (e) {
      console.log(e);
    }
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

export const __deleteRoom =
  (roomId) =>
  async (dispatch, getState, { history }) => {
    try {
      console.log(roomId);
      await roomApi.deleteRoom(roomId);
      dispatch(deleteRoom(roomId));
    } catch (e) {
      console.log(e);
    }
  };

//reducer
const room = handleActions(
  {
    [ADD_ROOM]: (state, action) =>
      produce(state, (draft) => {
        draft.room.unshift(action.payload.room.room);
      }),
    [JOIN_ROOM]: (state, action) =>
      produce(state, (draft) => {
        draft.room.unshift(action.payload.room);
      }),
    [GET_ROOM_LIST]: (state, action) =>
      produce(state, (draft) => {
        draft.room = action.payload.roomList.room;
        draft.isLoading = false;
      }),
    [EDIT_ROOM]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload.newContent.roomId);
        let idx = draft.room.findIndex(
          (r) => r._id === action.payload.newContent.roomId
        );

        draft.room[idx] = { ...draft.room[idx], ...action.payload.newContent };
        // {
        //   ...draft.roomList[idx],
        //   ...action.payload.room,
        // };
      }),
    [DELETE_ROOM]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.room.findIndex((r) => r._id === action.payload.roomId);

        if (idx !== -1) {
          draft.room.splice(idx, 1);
        }
      }),
  },
  initialState
);

export default room;
