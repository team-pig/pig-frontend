import { createAction, handleActions } from "redux-actions";
import produce from "immer";

const REQ_ERROR = "error/REQ_ERROR";
const reqError = createAction(REQ_ERROR, (e) => ({ e }));

export const __reqError =
  (e) =>
  (dispatch, getState, { history }) => {
    dispatch(reqError(e));
    console.log(`api 에러 👉 `, e);
    if (e.response.status === 400 || 500) history.replace("/roomlist");
  };

const initialState = {
  error: false,
};

const error = handleActions(
  {
    [REQ_ERROR]: (state, { payload }) =>
      produce(state, (draft) => {
        //
      }),
  },
  initialState
);

export default error;
