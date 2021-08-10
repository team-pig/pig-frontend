import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { memberApi } from "../../api/memberApi";

const LOAD_MEMBERS = "member/LOAD_MEMBERS";

const loadMembers = createAction(LOAD_MEMBERS, (allMembers) => ({
  allMembers,
}));

export const __loadMembers = (roomId) => async (dispatch) => {
  try {
    const { data } = await memberApi.loadMembers(roomId);
    dispatch(loadMembers(data.allMembers));
  } catch (e) {}
};

const initialState = {
  allMembers: [],
};

export const board = handleActions(
  {
    [LOAD_MEMBERS]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.allMembers = payload.allMembers;
      }),
  },
  initialState
);

export default board;
