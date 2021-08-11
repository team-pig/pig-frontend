import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { roomApi } from "../../api/roomApi";
import { setPreview, uploadImageToS3 } from "./image";

//action
const ADD_ROOM = "room/ADD_ROOM";
const SEARCH_ROOM = "room/SEARCH_ROOM";
const GET_ROOM_LIST = "room/GET_ROOM_LIST";
const GET_ONE_ROOM = "room/GET_ONE_ROOM";
const EDIT_ROOM = "room/EDIT_ROOM";
const DELETE_ROOM = "room/DELETE_ROOM";
const JOIN_ROOM = "room/JOIN_ROOM";
const EXIT_ROOM = "room/EXIT_ROOM";
const ADD_BOOKMARK = "room/ADD_BOOKMARK";
const DELETE_BOOKMARK = "room/DELETE_BOOKMARK";
const GET_MARKED_LIST = "room/GET_MARKED_LIST";
const GET_UNMARKED_LIST = "room/GET_UNMARKED_LIST";
const GET_MERGED_LIST = "room/GET_MERGED_LIST";
// const SET_IS_MARKED = "room/SET_IS_MARKED";
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
  // isMarked: false,
};

//action creator
// export const setIsMarked = createAction(SET_IS_MARKED, (isMarked) => ({
//   isMarked,
// }))
export const addRoom = createAction(ADD_ROOM, (room, markedList) => ({
  room,
  markedList,
}));
export const searchRoom = createAction(SEARCH_ROOM, (searchedRoom) => ({
  searchedRoom,
}));
export const getRoomList = createAction(
  GET_ROOM_LIST,
  (roomList, paging, userId) => ({
    roomList,
    paging,
    userId,
  })
);
export const getOneRoom = createAction(GET_ONE_ROOM, (roomId) => ({
  roomId,
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
  (room, roomId, isMarked) => ({
    room,
    roomId,
    isMarked,
  })
);
export const getMarkedList = createAction(GET_MARKED_LIST, (markedList) => ({
  markedList,
}));
export const getUnMarkedList = createAction(
  GET_UNMARKED_LIST,
  (unMarkedList) => ({ unMarkedList })
);

export const getMergedList = createAction(
  GET_MERGED_LIST,
  (unMarkedList, markedList) => ({
    unMarkedList,
    markedList,
  })
);

export const loading = createAction(LOADING, (isLoading) => ({ isLoading }));

//thunk function
// export const __setIsMarked =
//   (roomId, isMarked) =>
//   async (dispatch, getState, {history}) => {
//     try{
//       const _room = getState().room.room;
//       let idx = _room.findIndex(
//         (r) => r.roomId === roomId
//       );

//     }catch(e) {
//       console.log(e);
//     }
//   }

export const __joinRoom =
  (inviteCode) =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await roomApi.joinRoom(inviteCode);
      const markedList = getState().room.markedList;
      console.log(markedList);
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
  (searchContent) =>
  async (dispatch, getState, { history }) => {
    try {
      if (searchContent === "" || searchContent === null) {
        const { data } = await roomApi.searchRoom(null);
        const _room = getState().room.room;
        dispatch(searchRoom(_room));
      } else {
        const { data } = await roomApi.searchRoom(searchContent);
        dispatch(searchRoom(data));
      }
    } catch (e) {
      console.log(e);
    }
  };

export const __addRoom =
  (contents) =>
  async (dispatch, getState, { history }) => {
    try {
      const _image = getState().image.imgUrl;
      const markedList = getState().room.markedList;
      console.log(markedList);
      // const _image = getState().image.preview;
      const willDispatchContents = {
        ...contents,
        roomImage: _image,
      };
      //api post
      const { data } = await roomApi.addRoom(willDispatchContents);
      dispatch(addRoom(data, markedList));
    } catch (e) {
      console.log(e);
    }
  };

export const __editRoom =
  (roomId, contents, isEdit) =>
  async (dispatch, getState, { history }) => {
    try {
      const _image = getState().image.imgUrl;
      const newContent = {
        ...contents,
        roomImage: _image,
        roomId,
      };

      const { data } = await roomApi.editRoom(newContent);
      console.log(data);
      dispatch(editRoom(data));
      // dispatch(editRoom(roomId, willDispatchContents));
    } catch (e) {
      console.log(e);
    }
  };
export const __getMarkedList =
  () =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await roomApi.getMarkedList();
      console.log(data);
      dispatch(getMarkedList(data));
    } catch (e) {
      console.log(e);
    }
  };

export const __getUnMarkedList =
  () =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await roomApi.getUnMarkedList();
      console.log(data);
      dispatch(getUnMarkedList(data));
    } catch (e) {
      console.log(e);
    }
  };

export const __getMergedList =
  () =>
  async (dispatch, getState, { history }) => {
    try {
      const unMarkedList = getState().room.unMarkedList;
      const markedList = getState().room.markedList;
      dispatch(getMergedList(unMarkedList, markedList));
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

export const __toggleBookmark =
  (roomId, isMarked) =>
  async (dispatch, getState, { history }) => {
    try {
      if (isMarked === false) {
        const data = await roomApi.addBookmark(roomId);
        const markedList = getState().room.markedList;
        const room = data.data;
        dispatch(addBookmark(room, roomId, isMarked, markedList));

        // dispatch(addBookmark(data));
      } else if (isMarked === true) {
        await roomApi.deleteBookmark(roomId);

        dispatch(deleteBookmark(roomId, isMarked));
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
        draft.room.splice(
          action.payload.markedList.length,
          0,
          action.payload.room.room
        );
      }),
    [SEARCH_ROOM]: (state, action) =>
      produce(state, (draft) => {
        draft.searchedRoom = action.payload.searchedRoom;
      }),
    [JOIN_ROOM]: (state, action) =>
      produce(state, (draft) => {
        draft.room.splice(
          action.payload.markedList.length,
          0,
          action.payload.inviteCode.room
        );
      }),
    [GET_ROOM_LIST]: (state, action) =>
      produce(state, (draft) => {
        draft.room.push(...action.payload.roomList);

        draft.userId = action.payload.userId;

        draft.paging = action.payload.paging;
        draft.isLoading = false;
      }),

    [GET_MERGED_LIST]: (state, action) =>
      produce(state, (draft) => {
        draft.room = action.payload.markedList.concat(
          action.payload.unMarkedList
        );
      }),
    [GET_MARKED_LIST]: (state, action) =>
      produce(state, (draft) => {
        draft.markedList = action.payload.markedList.markedList;
        // const dupArr = draft.room.unshift(...draft.markedList);
        // draft.room = dupArr.filter((item, index) => {
        //   return dupArr.indexOf(item) === index;
        // });
        // draft.room = draft.markedList.concat(draft.room);

        // .reduce(
        //   (acc, curr) => (acc.includes(curr) ? acc : [...acc, curr]),
        //   []
        // );
      }),

    [GET_UNMARKED_LIST]: (state, action) =>
      produce(state, (draft) => {
        draft.unMarkedList = action.payload.unMarkedList.unMarkedList;
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
        let idx = draft.room.findIndex(
          (r) => r.roomId === action.payload.room.roomId
        );
        // draft.room.splice(idx, 1);
      }),
    [DELETE_BOOKMARK]: (state, action) => produce(state, (draft) => {}),
  },
  initialState
);

export default room;
