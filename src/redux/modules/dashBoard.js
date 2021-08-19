import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { dashBoardApi } from "../../api/dashBoardApi";
import { regex } from "../../shared/regex";

const LOAD_ALL_STATUS = "dashBoard/LOAD_ALL_STATUS";
const INIT_ALL_STATUS = "dashBoard/INIT_ALL_STATUS";

const loadAllStatus = createAction(LOAD_ALL_STATUS, (allMembers) => ({
  allMembers,
}));

export const initAllStatus = createAction(INIT_ALL_STATUS, () => ({}));

export const __loadAllStatus = (roomId) => async (dispatch) => {
  try {
    const { data } = await dashBoardApi.loadAllStatus(roomId);
    dispatch(loadAllStatus(data));
  } catch (e) {
    console.log(e);
  }
};

export const __editMyProfile = (roomId, newMyInfo) => async (dispatch) => {
  try {
    const filterTags =
      typeof newMyInfo.tags === "object"
        ? newMyInfo.tags
        : newMyInfo.tags.split(regex.commaAndTrim).filter(Boolean);

    const willReqParams = {
      ...newMyInfo,
      tags: filterTags,
    };

    await dashBoardApi.editMyProfile(roomId, willReqParams);
  } catch (e) {
    console.log(e);
  }
};

export const __editRoomInfos = (roomId, newRoominfos) => async (dispatch) => {
  try {
    const filterTags =
      typeof newRoominfos.tag === "object"
        ? newRoominfos.tag
        : newRoominfos.tag.split(regex.commaAndTrim).filter(Boolean);

    const willReqParams = {
      roomId,
      ...newRoominfos,
      tag: filterTags,
    };

    await dashBoardApi.editRoomInfos(willReqParams);
  } catch (e) {
    console.log(e);
  }
};

const initialState = {
  projectStatus: {},
  memberStatus: [],
};

export const dashBoard = handleActions(
  {
    [LOAD_ALL_STATUS]: (state, { payload }) =>
      produce(state, (draft) => {
        const { projectStatus, memberStatus } = payload.allMembers;
        draft.projectStatus = projectStatus;
        draft.memberStatus = memberStatus;
      }),

    [INIT_ALL_STATUS]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.projectStatus = {};
        draft.memberStatus = [];
      }),
  },
  initialState
);

export default dashBoard;
