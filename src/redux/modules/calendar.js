// calendar.js
// 간트차트와 비교해서 함께 사용하는 것으로 변경할 수도 있음.

import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import moment from "moment";

// action
const SET_NOW = "calendar/SET_NOW";
const SET_CURRENT = "calendar/SET_CURRENT";
const LOAD_SCHEDULES = "calendar/LOAD_SCHEDULES";
const LOAD_DETAIL = "calendar/LOAD_DETAIL";
const LOAD_DAY_SCHEDULES = "calendar/LOAD_DAY_SCHEDULES";
const ADD_SCHEDULE = "calendar/ADD_SCHEDULE";
const EDIT_SCHEDULE = "calendar/EDIT_SCHEDULE";
const DELETE_SCHEDULE = "calendar/DELETE_SCHEDULE";

// action creator
export const setNow = createAction(SET_NOW, (now) => ({ now: moment() }));
export const setCurrent = createAction(SET_CURRENT, (date) => ({
  date,
}));
const loadSchedules = createAction(LOAD_SCHEDULES, (schedules) => ({
  schedules,
}));
const loadDaySchedules = createAction(LOAD_DETAIL, (schedules) => ({
  schedules,
}));
const addSchedule = createAction(ADD_SCHEDULE, (schedule) => ({
  schedule,
}));
const editSchedule = createAction(EDIT_SCHEDULE, (scheduleId, newSchedule) => ({
  scheduleId,
  newSchedule,
}));
const deleteSchedule = createAction(DELETE_SCHEDULE, (scheduleId) => ({
  scheduleId,
}));

// thunk

// 모든 일정을 받아오는 thunk 함수 (월 이동 시 불러옴, lodash-debounce 사용)
export const __loadSchedules =
  (roomId, date) =>
  (dispatch, getState, { history }) => {
    // 모든 일정 받아와서 action creator로 전달
    let schedules; // 임시
    dispatch(loadSchedules(schedules));
  };

// 특정 일의 일정과 todo를 받아오는 thunk 함수
export const __loadDaySchedules =
  (roomId, date) =>
  (dispatch, getState, { history }) => {
    // date 형식 서버랑 정해야 함
    // 해당 날짜의 모든 일정 정보 가져오기
    let schedules; // 임시
    dispatch(loadDaySchedules(schedules));
  };

// schedule 새로 생성 thunk 함수
export const __addSchedule =
  (roomId, scheduleObj) =>
  (dispatch, getState, { history }) => {
    // scheduleObj를 보내서 저장
    // response로 오는 id를 저장해서 해당 월에 저장
    let schedule;
    dispatch(addSchedule(schedule));
  };

// schedule 수정 thunk 함수(patch)
// cardId(Board와 연결) + 바꾸려는 정보만 담아서 보냄
export const __editSchedule =
  (roomId, infoObj) =>
  (dispatch, getState, { history }) => {
    let scheduleId; // 임시
    let newSchedule; // 임시
    dispatch(editSchedule(scheduleId, newSchedule));
  };

// schedule 삭제 thunk 함수
// Board에서 __deleteCard(예상 thunk함수)와 같은 api 사용
export const __deleteSchedule =
  (roomId, scheduleId) =>
  (dispatch, getState, { history }) => {
    dispatch(deleteSchedule(scheduleId));
  };

//

// initialState
const initialState = {
  now: moment(),
  current: moment(),
  scheduleList: [],
  currentList: [],
};

// reducer
const calendar = handleActions(
  {
    [SET_NOW]: (state, action) =>
      produce(state, (draft) => {
        draft.now = action.payload.now;
      }),
    [SET_CURRENT]: (state, action) =>
      produce(state, (draft) => {
        draft.current = action.payload.date;
      }),
    [LOAD_SCHEDULES]: (state, action) =>
      produce(state, (draft) => {
        draft.scheduleList = action.payload.schedules;
      }),
    [LOAD_DAY_SCHEDULES]: (state, action) =>
      produce(state, (draft) => {
        draft.currentList = action.payload.schedules;
      }),
    [ADD_SCHEDULE]: (state, action) =>
      produce(state, (draft) => {
        draft.scheduleList.push(action.payload.schedule);
      }),
    [EDIT_SCHEDULE]: (state, action) =>
      produce(state, (draft) => {
        const { scheduleId, newSchedule } = action.payload;
        const idx = draft.scheduleList.findIndex(
          (schedule) => schedule.cardId === scheduleId
        );
        draft.scheduleList[idx] = newSchedule;
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
