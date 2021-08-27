import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { memberApi } from "../../api/memberApi";
import { __reqError } from "./error";

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
      dispatch(__reqError(e));
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
