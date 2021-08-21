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
  searchKeyword: "",
};

//action creator
export const initRoom = createAction(INIT_ROOM, () => ({}));
export const addRoom = createAction(ADD_ROOM, (room) => ({
  room,
}));

export const searchRoom = createAction(
  SEARCH_ROOM,
  (searchedRoom, searchContent) => ({
    searchedRoom,
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
  (room, roomId, markedList) => ({
    room,
    roomId,
    markedList,
  })
);
export const deleteBookmark = createAction(
  DELETE_BOOKMARK,
  (roomId, markedList) => ({
    roomId,
    markedList,
  })
);
export const getMarkedList = createAction(
  GET_MARKED_LIST,
  (markedList, isMarked) => ({
    markedList,
    isMarked,
  })
);

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
        dispatch(searchRoom(_room));
      } else {
        const { data } = await roomApi.searchRoom(searchContent);
        dispatch(searchRoom(data, searchContent));
      }
    } catch (e) {
      console.log(e);
    }
  };

export const __addRoom =
  (contents, roomImg, tagList) =>
  async (dispatch, getState, { history }) => {
    try {
      const markedList = getState().room.markedList;
      const willDispatchContents = {
        ...contents,
        roomImage: roomImg
          ? roomImg
          : "https://teampigbucket.s3.ap-northeast-2.amazonaws.com/teamPigLogo.png",
        tag: tagList,
      };
      //api post
      const { data } = await roomApi.addRoom(willDispatchContents);
      dispatch(addRoom(data, markedList));
    } catch (e) {
      console.log(e);
    }
  };

export const __editRoom =
  (roomId, contents, roomImg, tagList) =>
  async (dispatch, getState, { history }) => {
    try {
      const newContent = {
        ...contents,
        roomImage: roomImg
          ? roomImg
          : "https://teampigbucket.s3.ap-northeast-2.amazonaws.com/teamPigLogo.png",
        tag: tagList,
        roomId,
      };
      const { data } = await roomApi.editRoom(newContent);
      dispatch(editRoom(data));
    } catch (e) {
      console.log(e);
    }
  };
export const __getMarkedList =
  (isMarked) =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await roomApi.getMarkedList();
      dispatch(getMarkedList(data, isMarked));
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
        dispatch(addBookmark(room, roomId, markedList));
      } else if (isMarked === true) {
        const data = await roomApi.deleteBookmark(roomId);
        const markedList = data.data.markedList;
        dispatch(deleteBookmark(roomId, markedList));
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
        draft.searchedRoom = action.payload.searchedRoom.room;
        draft.searchKeyword = action.payload.searchContent;
      }),
    [JOIN_ROOM]: (state, action) =>
      produce(state, (draft) => {
        draft.room.unshift(action.payload.inviteCode.room);
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
        draft.isMarked = true;
      }),

    [EDIT_ROOM]: (state, action) =>
      produce(state, (draft) => {
        let defaultRoomIdx = draft.room.findIndex(
          (defaultRoom) =>
            defaultRoom.roomId === action.payload.room.room.roomId
        );
        draft.room[defaultRoomIdx] = {
          ...draft.room[defaultRoomIdx],
          ...action.payload.room.room,
        };

        let markedRoomIdx = draft.markedList.findIndex(
          (markedRoom) => markedRoom.roomId === action.payload.room.room.roomId
        );
        draft.markedList[markedRoomIdx] = {
          ...draft.markedList[markedRoomIdx],
          ...action.payload.room.room,
        };
      }),
    [DELETE_ROOM]: (state, action) =>
      produce(state, (draft) => {
        let defaultRoomIdx = draft.room.findIndex(
          (defaultRoom) => defaultRoom.roomId === action.payload.roomId
        );

        if (defaultRoomIdx !== -1) {
          draft.room.splice(defaultRoomIdx, 1);
        }

        let markedRoomIdx = draft.markedList.findIndex(
          (markedRoom) => markedRoom.roomId === action.payload.roomId
        );
        if (markedRoomIdx !== -1) {
          draft.markedList.splice(markedRoomIdx, 1);
        }
      }),
    [EXIT_ROOM]: (state, action) =>
      produce(state, (draft) => {
        let defaultRoomIdx = draft.room.findIndex(
          (defaultRoom) => defaultRoom.roomId === action.payload.roomId
        );
        if (defaultRoomIdx !== -1) {
          draft.room.splice(defaultRoomIdx, 1);
        }
        let markedRoomIdx = draft.markedList.findIndex(
          (markedRoom) => markedRoom.roomId === action.payload.roomId
        );
        if (markedRoomIdx !== -1) {
          draft.markedList.splice(markedRoomIdx, 1);
        }
      }),
    [ADD_BOOKMARK]: (state, action) =>
      produce(state, (draft) => {
        draft.markedList.unshift(action.payload.room);
      }),
    [DELETE_BOOKMARK]: (state, action) =>
      produce(state, (draft) => {
        let markedRoomIdx = draft.markedList.findIndex(
          (markedRoom) => markedRoom.roomId === action.payload.roomId
        );
        if (markedRoomIdx !== -1) {
          draft.markedList.splice(markedRoomIdx, 1);
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
