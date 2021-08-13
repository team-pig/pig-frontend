import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { dashBoardApi } from "../../api/dashBoardApi";

const LOAD_ALL_STATUS = "member/LOAD_ALL_STATUS";

const loadAllStatus = createAction(LOAD_ALL_STATUS, (allMembers) => ({
  allMembers,
}));

export const __loadAllStatus = (roomId) => async (dispatch) => {
  try {
    const { data } = await dashBoardApi.loadAllStatus(roomId);
    console.log(data);
  } catch (e) {
    console.log(e);
  }
};

const initialState = {
  projectStatus: {},
  memberStatus: {},
};

export const dashBoard = handleActions(
  {
    [LOAD_ALL_STATUS]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.allMembers = payload.allMembers;
      }),
  },
  initialState
);

export default dashBoard;
