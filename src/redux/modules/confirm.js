import { createAction, handleActions } from "redux-actions";
import produce from "immer";

export const SHOW_CONFIRM = "confirm/SHOW_CONFIRM";
export const HIDE_CONFIRM = "confirm/HIDE_CONFIRM";

const initialState = {
  result: false,
  show: false,
  msg: "",
};

export const showConfirm = createAction(SHOW_CONFIRM, (show, msg) => ({
  show,
  msg,
}));
export const hideConfirm = createAction(HIDE_CONFIRM, () => ({}));

export const __confirm =
  (show, msg) =>
  async (dispatch, getState, { history }) => {
    try {
      if (show === false) {
        dispatch(showConfirm(show, msg));
      } else if (show === true) {
        dispatch(hideConfirm(show));
      }
    } catch (e) {
      console.log(e);
    }
  };

const confirm = handleActions(
  {
    [SHOW_CONFIRM]: (state, action) =>
      produce(state, (draft) => {
        draft.show = true;
        draft.msg = action.payload.msg;
      }),
    [HIDE_CONFIRM]: (state, action) =>
      produce(state, (draft) => {
        draft.show = false;
        draft.msg = "";
      }),
  },
  initialState
);

export default confirm;
