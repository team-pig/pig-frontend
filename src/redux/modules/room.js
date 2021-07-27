import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { roomApi } from "../api/roomApi";
import { actionCreators } from "../../../../../../Downloads/src/redux/modules/image";
import { DRAFT_STATE } from "immer/dist/internal";

//action
const ADD_ROOM = "room/ADD_ROOM";
const GET_ROOM_LIST = "room/GET_ROOM_LIST";
const GET_ROOM = "room/GET_ROOM";

//initialState
const initialState = {
  roomList: [],
  room: null,
  willAddRoom: null,
};

//action creator
export const addRoom = createAction(ADD_ROOM, (room) => ({ room }));
// export const getRoomList = createAction(GET_ROOM_LIST, (roomList) => ({
//   roomList,
// }));

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

const actionCreaators = {
  addRoom,
};

export { actionCreators };
