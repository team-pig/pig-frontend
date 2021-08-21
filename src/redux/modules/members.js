import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { memberApi } from "../../api/memberApi";

// action type
const LOAD_MEMBERS = "members/LOAD_MEMBERS";

// action creator
const loadMembers = createAction(LOAD_MEMBERS, (members) => ({ members }));

// thunk
export const __loadMembers =
  (roomId) =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await memberApi.loadMembers(roomId);
      dispatch(loadMembers(data.allMembers));
    } catch (e) {
      console.log("멤버 목록을 가져오지 못했습니다.", e);
    }
  };

// initialState
const initialState = {
  members: [],
};

// reducer
const members = handleActions(
  {
    [LOAD_MEMBERS]: (state, action) =>
      produce(state, (draft) => {
        draft.members = action.payload.members;
      }),
  },
  initialState
);

export default members;
