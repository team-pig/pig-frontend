// calendar.js
// 간트차트와 비교해서 함께 사용하는 것으로 변경할 수도 있음.

import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import moment from "moment";
import { cardApi } from "../../api/cardApi";

// action
const SET_CURRENT_ID = "calendar/SET_CURRENT_ID";
const LOAD_SCHEDULES = "calendar/LOAD_SCHEDULES";
const LOAD_DETAIL = "calendar/LOAD_DETAIL";
const LOAD_DAY_SCHEDULES = "calendar/LOAD_DAY_SCHEDULES";
const ADD_SCHEDULE = "calendar/ADD_SCHEDULE";
const EDIT_SCHEDULE = "calendar/EDIT_SCHEDULE";
const DELETE_SCHEDULE = "calendar/DELETE_SCHEDULE";

// action creator

export const setCurrentId = createAction(SET_CURRENT_ID, (id) => ({ id }));
const loadSchedules = createAction(LOAD_SCHEDULES, (schedules) => ({
  schedules,
}));
export const loadDaySchedules = createAction(LOAD_DAY_SCHEDULES, (idAry) => ({
  idAry,
}));
const addSchedule = createAction(ADD_SCHEDULE, (schedule) => ({
  schedule,
}));
const editSchedule = createAction(EDIT_SCHEDULE, (scheduleObj) => ({
  scheduleObj,
}));
const deleteSchedule = createAction(DELETE_SCHEDULE, (scheduleId) => ({
  scheduleId,
}));

// initialSchedule
const initialSchedule = {
  cardTitle: "",
  startDate: moment().clone().format("YYYY-MM-DD"),
  endDate: moment().clone().format("YYYY-MM-DD"),
  desc: "",
  color: null,
  taskMembers: [],
};

// thunk
// 모든 일정을 받아오는 thunk 함수 (월 이동 시 불러옴, lodash-debounce 사용)
export const __loadSchedules =
  (roomId, date) =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await cardApi.getCards(roomId);
      dispatch(loadSchedules(data.cards));
    } catch (e) {
      console.log("카드를 불러오지 뭇했습니다.", e);
    }
  };

// schedule 새로 생성 thunk 함수
export const __addSchedule =
  (roomId) =>
  (dispatch, getState, { history }) => {
    // 모두 빈 값으로 저장
    // response로 오는 id를 currentId에 저장
    let cardId = Date.now();
    let scheduleObj = { ...initialSchedule, cardId };
    dispatch(addSchedule(scheduleObj));
  };

// schedule 수정 thunk 함수(patch)
// cardId(Board와 연결) + 바꾸려는 정보만 담아서 보냄
export const __editSchedule =
  (roomId, editObj) =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await cardApi.editCardInfo(roomId, editObj);
      dispatch(editSchedule(editObj));
    } catch (e) {
      console.log("수정에 실패했습니다.", e);
    }
  };

// schedule 삭제 thunk 함수
// Board에서 __deleteCard(예상 thunk함수)와 같은 api 사용
export const __deleteSchedule =
  (roomId, cardId) =>
  async (dispatch, getState, { history }) => {
    try {
      await cardApi.deleteCard(cardId, roomId);
      dispatch(deleteSchedule(cardId));
    } catch (e) {
      console.log("삭제에 실패했습니다.", e);
    }
  };

// initialState
const initialState = {
  scheduleList: [],
  currentList: [],
  currentScheduleId: null,
};

// reducer
const calendar = handleActions(
  {
    [SET_CURRENT_ID]: (state, action) =>
      produce(state, (draft) => {
        draft.currentScheduleId = action.payload.id;
      }),
    [LOAD_SCHEDULES]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload.schedules);
        draft.scheduleList = action.payload.schedules;
      }),
    [LOAD_DAY_SCHEDULES]: (state, action) =>
      produce(state, (draft) => {
        const { idAry } = action.payload;
        const newAry = draft.scheduleList.filter((schedule) =>
          idAry.includes(schedule.cardId)
        );
        draft.currentList = newAry;
      }),
    [ADD_SCHEDULE]: (state, action) =>
      produce(state, (draft) => {
        const { schedule } = action.payload;
        draft.currentScheduleId = schedule.cardId;
        draft.scheduleList.push(action.payload.schedule);
      }),
    [EDIT_SCHEDULE]: (state, action) =>
      produce(state, (draft) => {
        const { cardId, ...rest } = action.payload.scheduleObj;
        const idx = draft.scheduleList.findIndex(
          (schedule) => schedule.cardId === cardId
        );
        for (const [key, value] of Object.entries(rest)) {
          draft.scheduleList[idx][key] = value;
        }
      }),
    [DELETE_SCHEDULE]: (state, action) =>
      produce(state, (draft) => {
        const { scheduleId } = action.payload;
        const idx = draft.scheduleList.findIndex(
          (schedule) => schedule.cardId === scheduleId
        );
        draft.scheduleList.splice(idx, 1);
      }),
  },
  initialState
);

export default calendar;
