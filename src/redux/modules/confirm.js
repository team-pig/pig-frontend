import { createAction, handleActions } from "redux-actions";
import produce from "immer";

export const SHOW_CONFIRM = "confirm/SHOW_CONFIRM";
export const HIDE_CONFIRM = "confirm/HIDE_CONFIRM";

const initialState = {
  result: false,
  show: false,
  text: "",
};

export const showConfirm = createAction(SHOW_CONFIRM, () => ({}));
export const hideConfirm = createAction(HIDE_CONFIRM, () => ({}));

export const __confirm =
  (show) =>
  async (dispatch, getState, { history }) => {
    try {
      if (show === false) {
        dispatch(showConfirm(show));
        console.log("show");
      } else if (show === true) {
        dispatch(hideConfirm(show));
        console.log("show 끄기");
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
        draft.text = action.payload.text;
      }),
    [HIDE_CONFIRM]: (state, action) =>
      produce(state, (draft) => {
        draft.show = false;
        draft.text = "";
      }),
  },
  initialState
);

export default confirm;
