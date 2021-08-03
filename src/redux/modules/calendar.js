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
  (dispatch, getState, { history }) => {
    // 모든 일정 받아와서 action creator로 전달
    // let schedules; // 임시
    // dispatch(loadSchedules(schedules));
  };

// 특정 일의 일정과 todo를 받아오는 thunk 함수
export const __loadDaySchedules =
  (roomId, scheduleAry) =>
  (dispatch, getState, { history }) => {
    // scheduleAry = 해당 날짜의 모든
    // 해당 날짜의 모든 일정 정보 가져오기
    let schedules; // 임시
    dispatch(loadDaySchedules(schedules));
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
      // const {data} = await api.editCard(roomId, editObj)
      dispatch(editSchedule(editObj));
    } catch (e) {
      console.log("수정에 실패했습니다.", e);
    }
  };

// schedule 삭제 thunk 함수
// Board에서 __deleteCard(예상 thunk함수)와 같은 api 사용
export const __deleteSchedule =
  (roomId, scheduleId) =>
  (dispatch, getState, { history }) => {
    dispatch(deleteSchedule(scheduleId));
  };

// initialState
const initialState = {
  now: moment(),
  current: moment(),
  scheduleList: [
    {
      cardId: 1,
      cardTitle: "과제 제출하기",
      startDate: "2021-08-03",
      endDate: "2021-08-05",
      desc: "hahaha",
      taskMembers: [],
    },
    {
      cardId: 2,
      cardTitle: "휴식 취하기",
      startDate: "2021-08-08",
      endDate: "2021-08-14",
      desc: "아무것도 안하고 쉬기",
      taskMembers: [],
    },
    {
      cardId: 3,
      cardTitle: "프로젝트 하기",
      startDate: "2021-08-01",
      endDate: "2021-08-16",
      desc: "프로젝트...",
      taskMembers: [],
    },
  ],
  currentList: [],
  currentScheduleId: null,
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
          console.log(key, value);
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
