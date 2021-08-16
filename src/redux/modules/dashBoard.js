import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { dashBoardApi } from "../../api/dashBoardApi";
import { regex } from "../../shared/regex";

const LOAD_ALL_STATUS = "dashBoard/LOAD_ALL_STATUS";
const EDIT_MY_PROFILE = "dashBoard/EDIT_MY_PROFILE";
const LOAD_ALL_ROOM_INFO = "dashBoard/LOAD_ALL_ROOM_INFO";
const EDIT_ROOM_INFOS = "dashBoard/EDIT_ROOM_INFOS";
const INCREASE_MY_CHECKED = "dashBoard/INCREASE_MY_CHECKED";
const DECREASE_MY_CHECKED = "dashBoard/DECREASE_MY_CHECKED";

const loadAllStatus = createAction(LOAD_ALL_STATUS, (allMembers) => ({
  allMembers,
}));

const editMyProfile = createAction(EDIT_MY_PROFILE, (newMyInfo) => ({
  newMyInfo,
}));

const loadAllRoomInfo = createAction(EDIT_MY_PROFILE, (roomInfos) => ({
  roomInfos,
}));

export const increaseMyChecked = createAction(INCREASE_MY_CHECKED, (count) => ({
  count,
}));
export const decreaseMyChecked = createAction(DECREASE_MY_CHECKED, (count) => ({
  count,
}));

export const __loadAllStatus = (roomId) => async (dispatch) => {
  try {
    const { data } = await dashBoardApi.loadAllStatus(roomId);
    console.log(data);
    dispatch(loadAllStatus(data));
  } catch (e) {
    console.log(e);
  }
};

export const __editMyProfile = (roomId, newMyInfo) => async (dispatch) => {
  try {
    const willReqParams = {
      ...newMyInfo,
      tags:
        typeof newMyInfo.tags === "object"
          ? newMyInfo.tags
          : newMyInfo.tags.split(regex.commaAndTrim),
    };

    await dashBoardApi.editMyProfile(roomId, willReqParams);
  } catch (e) {
    console.log(e);
  }
};

export const __loadAllRoomInfo = (roomId) => async (dispatch) => {
  try {
    // const { data } = await dashBoardApi.loadAllRoomInfo(roomId);
    // const { master, roomName, subTitle, roomImage, tags } = data;
    // dispatch(loadAllRoomInfo({ master, roomName, subTitle, roomImage, tags }));
  } catch (e) {}
};

export const __editRoomInfos = (roomId, newRoominfos) => async (dispatch) => {
  try {
    const willReqParams = {
      roomId,
      ...newRoominfos,
      tag:
        typeof newRoominfos.tag === "object"
          ? newRoominfos.tag
          : newRoominfos.tag.split(regex.commaAndTrim),
    };

    await dashBoardApi.editRoomInfos(willReqParams);
  } catch (e) {
    console.log(e);
  }
};

const initialState = {
  projectStatus: {},
  memberStatus: [],
  myProfile: {},
  roomInfos: {},
};

export const dashBoard = handleActions(
  {
    [LOAD_ALL_STATUS]: (state, { payload }) =>
      produce(state, (draft) => {
        const { projectStatus, memberStatus } = payload.allMembers;
        draft.projectStatus = projectStatus;
        draft.memberStatus = memberStatus;
      }),
  },
  initialState
);

export default dashBoard;
