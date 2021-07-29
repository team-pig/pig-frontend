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
const LOADING = "LOADING";

//initialState
const initialState = {
  roomList: [
    {
      roomId: 1,
      roomImage:
        "https://teampigbucket.s3.ap-northeast-2.amazonaws.com/%EC%9D%BC%EC%B6%9C.jpg",
      roomName: "1번이다",
      subtitle: "1번 서브",
      tag: "#1번 태그",
    },
    {
      roomId: 2,
      roomImage:
        "https://teampigbucket.s3.ap-northeast-2.amazonaws.com/%ED%95%98%EB%8A%98%EC%82%AC%EC%A7%84.jpg",
      roomName: "2번이다",
      subtitle: "2번 서브",
      tag: "#2번 태그",
    },
  ],
  room: null,
  isLoading: false,
};

//action creator
export const addRoom = createAction(ADD_ROOM, (room) => ({ room }));
export const getRoomList = createAction(GET_ROOM_LIST, (roomList) => ({
  roomList,
}));
export const getOneRoom = createAction(GET_ONE_ROOM, (roomId) => ({
  roomId,
}));
export const editRoom = createAction(EDIT_ROOM, (roomId, newContent) => ({
  roomId,
  newContent,
}));
export const deleteRoom = createAction(DELETE_ROOM, (roomId) => ({ roomId }));
export const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

//thunk function
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
      // const { data } = await roomApi.addRoom(willDispatchContents);
      // dispatch(addRoom(data));
      dispatch(addRoom(willDispatchContents));
    } catch (e) {
      console.log(e);
    }
  };

export const __editRoom =
  (roomId, newContent, isEdit) =>
  async (dispatch, getState, { history }) => {
    try {
      const _image = getState().image.preview;
      const _room_idx = getState().room.roomList.findIndex(
        (r) => r.roomId === roomId
      );

      const _room = getState().room.roomList[_room_idx];

      const willDispatchContents = {
        ...newContent,
        roomImage: _image,
      };

      // const { data } = await roomApi.editRoom(roomId, willDispatchContents);
      // dispatch(editRoom(data));
      dispatch(editRoom(roomId, willDispatchContents));
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
      // await roomApi.deleteRoom(roomId);
      console.log(roomId);
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
        draft.roomList.unshift(action.payload.room);
      }),
    [GET_ROOM_LIST]: (state, action) =>
      produce(state, (draft) => {
        draft.roomList = action.payload.roomList;
        draft.isLoading = false;
      }),
    [EDIT_ROOM]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.roomList.findIndex(
          (r) => r.roomId === action.payload.roomId
        );

        draft.roomList[idx] = action.payload.newContent;
        // {
        //   ...draft.roomList[idx],
        //   ...action.payload.room,
        // };
      }),
    [DELETE_ROOM]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.roomList.findIndex(
          (r) => r.roomId === action.payload.roomId
        );

        if (idx !== -1) {
          draft.roomList.splice(idx, 1);
        }
      }),
  },
  initialState
);

export default room;
