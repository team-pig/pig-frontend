import { createAction, handleActions } from "redux-actions";
import produce from "immer";

const POP = "alert/POP";
export const pop = createAction(POP, (params) => ({ params }));

const initialState = {
  value: null,
  msg: "",
};

const alert = handleActions(
  {
    [POP]: (state, { payload }) =>
      produce(state, (draft) => {
        const { value, msg } = payload.params;
        draft.msg = msg;
        draft.value = value;
      }),
  },
  initialState
);

export default alert;
