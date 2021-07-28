import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import moment from "moment";

// action
const SET_NOW = "calendar/SET_NOW";
const SET_CURRENT = "calendar/SET_CURRENT";

// action creator
export const setNow = createAction(SET_NOW, (now) => ({ now: moment() }));
export const setCurrent = createAction(SET_CURRENT, (date) => ({
  date,
}));

// thunk

// initialState
const initialState = {
  now: moment(),
  current: moment(),
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
  },
  initialState
);

export default calendar;
