// calendar.js
// 간트차트와 비교해서 함께 사용하는 것으로 변경할 수도 있음.

import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import moment from "moment";
import { cardApi } from "../../api/cardApi";
import { todoApi } from "../../api/todoApi";
import { bucketApi } from "../../api/bucketApi";
import { updateCardLocateOtherBucket } from "./board";
import { __reqError } from "./error";

// action
const LOAD_BUCKETS = "calendar/LOAD_BUCKETS";
const SET_CURRENT_ID = "calendar/SET_CURRENT_ID";
const SET_MODAL_ID = "calendar/SET_MODAL_ID";
const LOAD_SCHEDULES = "calendar/LOAD_SCHEDULES";
const LOAD_DAY_SCHEDULES = "calendar/LOAD_DAY_SCHEDULES";
const ADD_SCHEDULE = "calendar/ADD_SCHEDULE";
const EDIT_SCHEDULE = "calendar/EDIT_SCHEDULE";
const EDIT_SCHEDULE_BUCKET = "calendar/EDIT_SCHEDULE_BUCKET";
const DELETE_SCHEDULE = "calendar/DELETE_SCHEDULE";
const GET_TODO_BY_SCHEDULE = "calendar/GET_TODO_BY_SCHEDULE";
const RESET_TIMELINE = "calendar/RESET_TIMELINE";
const LOAD_CARD_BY_ID = "calendar/LOAD_CARD_BY_ID";
const RESET_CARD = "calendar/RESET_CARD";

// action creator
export const resetCardTocalendar = createAction(RESET_CARD);
const loadBuckets = createAction(LOAD_BUCKETS, (buckets, bucketOrders) => ({
  buckets,
  bucketOrders,
}));
export const setCurrentId = createAction(SET_CURRENT_ID, (id) => ({ id }));
export const setModalId = createAction(SET_MODAL_ID, (id) => ({ id }));
const loadSchedules = createAction(LOAD_SCHEDULES, (schedules) => ({
  schedules,
}));
export const loadDaySchedules = createAction(LOAD_DAY_SCHEDULES, (idAry) => ({
  idAry,
}));
const addSchedule = createAction(ADD_SCHEDULE, (schedule) => ({
  schedule,
}));
export const editSchedule = createAction(EDIT_SCHEDULE, (scheduleObj) => ({
  scheduleObj,
}));
const editScheduleBucket = createAction(
  EDIT_SCHEDULE_BUCKET,
  (cardId, destinationBucketId) => ({ cardId, destinationBucketId })
);
const deleteSchedule = createAction(DELETE_SCHEDULE, (scheduleId) => ({
  scheduleId,
}));
const getTodoBySchedule = createAction(GET_TODO_BY_SCHEDULE, (todos) => ({
  todos,
}));
export const resetTimeline = createAction(RESET_TIMELINE);

export const loadCardByIdToCalendar = createAction(LOAD_CARD_BY_ID, (card) => ({
  card,
}));

// thunk
export const __loadBuckets =
  (roomId) =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await bucketApi.getBuckets(roomId);
      dispatch(loadBuckets(data.buckets, data.bucketOrder.bucketOrder));
    } catch (e) {
      console.log("버킷을 불러올 수 없습니다.", e);
    }
  };

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
  (roomId, bucketId) =>
  async (dispatch, getState, { history }) => {
    const cardTitle = "제목 없음";
    const initDate = moment().format("YYYY-MM-DD");
    const initColor = "blue";

    const { data } = await cardApi.createCard(
      roomId,
      bucketId,
      cardTitle,
      initDate,
      initColor
    );
    let scheduleObj = {
      roomId,
      bucketId,
      cardTitle,
      startDate: initDate,
      endDate: initDate,
      color: initColor,
      cardId: data.cardId,
    };
    dispatch(addSchedule(scheduleObj));
  };

export const __editScheduleBucket =
  (roomId, cardId, sourceBucketId, destinationBucketId) =>
  async (dispatch, getState, { history }) => {
    try {
      const columns = getState().board.columns;

      const cardOrder = {};
      Object.entries(columns).forEach(
        (entry) => (cardOrder[`${entry[0]}`] = entry[1].cardOrder)
      );

      cardOrder[`${sourceBucketId}`] = cardOrder[`${sourceBucketId}`].filter(
        (id) => id !== cardId
      );

      cardOrder[`${destinationBucketId}`] = [
        ...cardOrder[`${destinationBucketId}`],
        cardId,
      ];

      await cardApi.editCardLocation(
        roomId,
        cardOrder,
        cardId,
        destinationBucketId
      );

      const bucketInfo = {
        sourceBucketId,
        destinationBucketId,
        sourceBucketOrder: cardOrder[`${sourceBucketId}`],
        destinationBucketOrder: cardOrder[`${destinationBucketId}`],
      };

      dispatch(updateCardLocateOtherBucket(cardId, bucketInfo));
      dispatch(editScheduleBucket(cardId, destinationBucketId));
    } catch (e) {
      dispatch(__reqError(e));
    }
  };

// schedule 삭제 thunk 함수
// Board에서 __deleteCard(예상 thunk함수)와 같은 api 사용
export const __deleteSchedule =
  (roomId, cardId) =>
  async (dispatch, getState, { history }) => {
    try {
      await cardApi.deleteCard("", cardId, roomId);
      dispatch(deleteSchedule(cardId));
    } catch (e) {
      console.log("삭제에 실패했습니다.", e);
    }
  };

export const __getTodoBySchedule =
  (roomId, cardId) =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await todoApi.getTodo(roomId, cardId);
      dispatch(getTodoBySchedule(data.todos));
    } catch (e) {
      console.log("해당 일정의 투두리스트를 불러오지 못했습니다.", e);
    }
  };

// initialState
const initialState = {
  buckets: [],
  bucketOrders: [],
  scheduleList: [],
  currentList: [],
  currentScheduleId: null,
  currentSchedule: {},
  currentTodos: [],
  modalId: null,
  card: {},
};

// reducer
const calendar = handleActions(
  {
    [LOAD_BUCKETS]: (state, action) =>
      produce(state, (draft) => {
        draft.buckets = action.payload.buckets;
        draft.bucketOrders = action.payload.bucketOrders;
      }),
    [SET_CURRENT_ID]: (state, action) =>
      produce(state, (draft) => {
        draft.currentScheduleId = action.payload.id;
      }),
    [SET_MODAL_ID]: (state, action) =>
      produce(state, (draft) => {
        draft.modalId = action.payload.id;
      }),
    [LOAD_SCHEDULES]: (state, action) =>
      produce(state, (draft) => {
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
        draft.modalId = schedule.cardId;
        draft.scheduleList.push(schedule);
        draft.currentSchedule = schedule;
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
        // 현재 모달에 띄어진 카드의 정보 업데이트
        const newInfoKey = Object.keys(rest)[0];
        draft.card[newInfoKey] = rest[newInfoKey];
      }),
    [EDIT_SCHEDULE_BUCKET]: (state, action) =>
      produce(state, (draft) => {
        const { cardId, destinationBucketId } = action.payload;
        const idx = draft.scheduleList.findIndex(
          (schedule) => schedule.cardId === cardId
        );
        draft.scheduleList[idx].bucketId = destinationBucketId;
      }),
    [DELETE_SCHEDULE]: (state, action) =>
      produce(state, (draft) => {
        const { scheduleId } = action.payload;
        const idx = draft.scheduleList.findIndex(
          (schedule) => schedule.cardId === scheduleId
        );
        draft.scheduleList.splice(idx, 1);
      }),
    [GET_TODO_BY_SCHEDULE]: (state, action) =>
      produce(state, (draft) => {
        draft.currentTodos = action.payload.todos;
      }),
    [RESET_TIMELINE]: (state, action) =>
      produce(action, (draft) => {
        Object.entries(initialState).forEach((ary) => (draft[ary[0]] = ary[1]));
      }),

    // 모달을 띄었을 때 cardId를 통해 1장의 카드 상세 정보 불러와서 모듈에 저장
    [LOAD_CARD_BY_ID]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.card = payload.card.result;
      }),

    [RESET_CARD]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.card = {};
      }),
  },
  initialState
);

export default calendar;
