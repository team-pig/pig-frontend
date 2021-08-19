import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { roomApi } from "../../api/roomApi";

//action
const ADD_ROOM = "room/ADD_ROOM";
const SEARCH_ROOM = "room/SEARCH_ROOM";
const GET_ONE_ROOM = "room/GET_ONE_ROOM";
const GET_ROOM_LIST = "room/GET_ROOM_LIST";
const GET_INVITE_CODE_ROOM = "room/GET_INVITE_CODE_ROOM";
const EDIT_ROOM = "room/EDIT_ROOM";
const DELETE_ROOM = "room/DELETE_ROOM";
const JOIN_ROOM = "room/JOIN_ROOM";
const EXIT_ROOM = "room/EXIT_ROOM";
const ADD_BOOKMARK = "room/ADD_BOOKMARK";
const DELETE_BOOKMARK = "room/DELETE_BOOKMARK";
const GET_MARKED_LIST = "room/GET_MARKED_LIST";
const INIT_ROOM = "room/INIT_ROOM";

const LOADING = "LOADING";

//initialState
const initialState = {
  // roomList: [],
  searchedRoom: [],
  room: [],
  isLoading: false,
  paging: { page: 1, next: null, size: 12 },
  userId: "",
  markedList: [],
  unMarkedList: [],
  mergedList: [],
  inviteCodeRoom: [],
  currentRoom: {},
  searchPaging: { page: 1, next: null, size: 12 },
};

//action creator

export const initRoom = createAction(INIT_ROOM, () => ({}));

export const addRoom = createAction(ADD_ROOM, (room, markedList) => ({
  room,
  markedList,
}));

export const searchRoom = createAction(
  SEARCH_ROOM,
  (searchedRoom, paging, searchContent) => ({
    searchedRoom,
    paging,
    searchContent,
  })
);

export const getRoomList = createAction(
  GET_ROOM_LIST,
  (roomList, paging, userId) => ({
    roomList,
    paging,
    userId,
  })
);
export const getOneRoom = createAction(GET_ONE_ROOM, (room) => ({
  room,
}));
export const getInviteCodeRoom = createAction(GET_INVITE_CODE_ROOM, (room) => ({
  room,
}));
export const editRoom = createAction(EDIT_ROOM, (room) => ({
  room,
}));
export const deleteRoom = createAction(DELETE_ROOM, (roomId) => ({ roomId }));
export const joinRoom = createAction(JOIN_ROOM, (inviteCode, markedList) => ({
  inviteCode,
  markedList,
}));
export const exitRoom = createAction(EXIT_ROOM, (roomId) => ({ roomId }));

export const addBookmark = createAction(
  ADD_BOOKMARK,
  (room, roomId, isMarked, markedList) => ({
    room,
    roomId,
    isMarked,
    markedList,
  })
);
export const deleteBookmark = createAction(
  DELETE_BOOKMARK,
  (roomId, isMarked, markedList) => ({
    roomId,
    isMarked,
    markedList,
  })
);
export const getMarkedList = createAction(GET_MARKED_LIST, (markedList) => ({
  markedList,
}));

export const loading = createAction(LOADING, (isLoading) => ({ isLoading }));

//thunk function

export const __joinRoom =
  (inviteCode) =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await roomApi.joinRoom(inviteCode);
      const markedList = getState().room.markedList;
      dispatch(joinRoom(data, markedList));
    } catch (e) {
      console.log(e);
    }
  };

export const __exitRoom =
  (roomId) =>
  async (dispatch, getState, { history }) => {
    try {
      await roomApi.exitRoom(roomId);
      dispatch(exitRoom(roomId));
    } catch (e) {
      console.log(e);
    }
  };

export const __searchRoom =
  (searchContent, page) =>
  async (dispatch, getState, { history }) => {
    try {
      if (searchContent === "" || searchContent === null) {
        const _room = getState().room.room;
        const { data } = await roomApi.searchRoom(1, 20, null);

        dispatch(searchRoom(_room));
      } else {
        const _room = getState().room.room;
        const { data } = await roomApi.searchRoom(1, 20, searchContent);

        dispatch(searchRoom(data));
      }
    } catch (e) {
      console.log(e);
    }
  };

export const __addRoom =
  (contents, roomImg) =>
  async (dispatch, getState, { history }) => {
    try {
      const markedList = getState().room.markedList;
      const willDispatchContents = {
        ...contents,
        roomImage: roomImg
          ? roomImg
          : "https://teampigbucket.s3.ap-northeast-2.amazonaws.com/teamPigLogo.png",
      };
      //api post
      const { data } = await roomApi.addRoom(willDispatchContents);
      dispatch(addRoom(data, markedList));
    } catch (e) {
      console.log(e);
    }
  };

export const __editRoom =
  (roomId, contents, roomImg, isEdit) =>
  async (dispatch, getState, { history }) => {
    try {
      const newContent = {
        ...contents,
        roomImage: roomImg
          ? roomImg
          : "https://teampigbucket.s3.ap-northeast-2.amazonaws.com/teamPigLogo.png",
        roomId,
      };
      const { data } = await roomApi.editRoom(newContent);
      dispatch(editRoom(data));
    } catch (e) {
      console.log(e);
    }
  };
export const __getMarkedList =
  () =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await roomApi.getMarkedList();
      dispatch(getMarkedList(data));
    } catch (e) {
      console.log(e);
    }
  };

export const __getRoomList =
  () =>
  async (dispatch, getState, { history }) => {
    try {
      const _next = getState().room.paging.next;
      const _page = getState().room.paging.page;
      const _size = getState().room.paging.size;
      if (_page === false && _next === false) return;

      const { data } = await roomApi.getRoomList(_page, _size);

      const totalPages = data.totalPages;
      const userId = data.userId;

      let paging = {
        page: data.room.length < _size ? false : _page + 1,
        next: _page === totalPages ? false : true,
        size: _size,
      };
      dispatch(getRoomList(data.room, paging, userId));
    } catch (e) {
      console.log(e);
    }
  };

export const __getInviteCodeRoom =
  (inviteCode) =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await roomApi.getInviteCodeRoom(inviteCode);
      dispatch(getInviteCodeRoom(data));
    } catch (e) {
      console.log(e);
    }
  };

export const __getOneRoom =
  (roomId) =>
  async (dispatch, getState, { history }) => {
    try {
      const {
        data: { result },
      } = await roomApi.getOneRoom(roomId);
      dispatch(getOneRoom(result));
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

export const __toggleBookmark =
  (roomId, isMarked) =>
  async (dispatch, getState, { history }) => {
    try {
      if (isMarked === false) {
        const data = await roomApi.addBookmark(roomId);
        const markedList = data.data.markedList;
        const room = data.data.bookmarkedRoom;
        dispatch(addBookmark(room, roomId, isMarked, markedList));
      } else if (isMarked === true) {
        const data = await roomApi.deleteBookmark(roomId);
        console.log(data);
        const markedList = data.data.markedList;
        dispatch(deleteBookmark(roomId, isMarked, markedList));
      }
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
    [SEARCH_ROOM]: (state, action) =>
      produce(state, (draft) => {
        if (
          action.payload.searchContent === "" ||
          action.payload.searchContent === null
        ) {
          draft.searchedRoom = action.payload.searchedRoom;
        } else {
          draft.searchedRoom = action.payload.searchedRoom.room;
        }
        draft.isLoading = false;
      }),
    [JOIN_ROOM]: (state, action) =>
      produce(state, (draft) => {
        draft.room.unshift(action.payload.room.room);
      }),

    [GET_INVITE_CODE_ROOM]: (state, action) =>
      produce(state, (draft) => {
        draft.inviteCodeRoom = action.payload.room;
      }),
    [GET_ONE_ROOM]: (state, action) =>
      produce(state, (draft) => {
        draft.currentRoom = action.payload.room;
      }),
    [GET_ROOM_LIST]: (state, action) =>
      produce(state, (draft) => {
        draft.room.push(...action.payload.roomList);

        draft.userId = action.payload.userId;

        draft.paging = action.payload.paging;
        draft.isLoading = false;
      }),

    [GET_MARKED_LIST]: (state, action) =>
      produce(state, (draft) => {
        draft.markedList = action.payload.markedList.markedList;
      }),

    [EDIT_ROOM]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.room.findIndex(
          (r) => r.roomId === action.payload.room.room.roomId
        );

        draft.room[idx] = { ...draft.room[idx], ...action.payload.room.room };
      }),
    [DELETE_ROOM]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.room.findIndex(
          (r) => r.roomId === action.payload.roomId
        );

        if (idx !== -1) {
          draft.room.splice(idx, 1);
        }

        let index = draft.markedList.findIndex(
          (r) => r.roomId === action.payload.roomId
        );
        if (index !== -1) {
          draft.markedList.splice(index, 1);
        }
      }),
    [EXIT_ROOM]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.room.findIndex(
          (r) => r.roomId === action.payload.roomId
        );

        if (idx !== -1) {
          draft.room.splice(idx, 1);
        }
      }),
    [ADD_BOOKMARK]: (state, action) =>
      produce(state, (draft) => {
        draft.markedList.unshift(action.payload.room);
      }),
    [DELETE_BOOKMARK]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.markedList.findIndex(
          (r) => r.roomId === action.payload.roomId
        );

        if (idx !== -1) {
          draft.markedList.splice(idx, 1);
        }
      }),

    [INIT_ROOM]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.currentRoom = {};
      }),
  },
  initialState
);

export default room;
