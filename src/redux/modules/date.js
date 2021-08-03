import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import moment from "moment";

// action
const SET_NOW = "date/SET_NOW";
const SET_CURRENT = "date/SET_CURRENT";
const SELECT_DATE = "date/SELECT_DATE";

// action creator
export const setNow = createAction(SET_NOW, (now) => ({ now: moment() }));
export const setCurrent = createAction(SET_CURRENT, (date) => ({
  date,
}));
export const selectDate = createAction(SELECT_DATE, (date) => ({ date }));

// initialState
const initialState = {
  now: moment(),
  current: moment(),
  selectedDate: moment().clone().format("YYYY-MM-DD"),
};

// reducer
const date = handleActions(
  {
    [SET_NOW]: (state, action) =>
      produce(state, (draft) => {
        draft.now = action.payload.now;
      }),
    [SET_CURRENT]: (state, action) =>
      produce(state, (draft) => {
        draft.current = action.payload.date;
      }),
    [SELECT_DATE]: (state, action) =>
      produce(state, (draft) => {
        draft.selectedDate = action.payload.date;
      }),
  },
  initialState
);

export default date;
