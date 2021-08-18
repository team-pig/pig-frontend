import { createAction, handleActions } from "redux-actions";
import produce from "immer";

// action type
const RESIZE_DOCLIST = "resize/RESIZE_DOCLIST";

// action creator;
export const resizeDocList = createAction(RESIZE_DOCLIST, (width) => ({
  width,
}));

// initialState
const initialState = {
  docListWidth: 260,
};

// reducer
const resize = handleActions(
  {
    [RESIZE_DOCLIST]: (state, action) =>
      produce(state, (draft) => {
        draft.docListWidth = action.payload.width;
      }),
  },
  initialState
);

export default resize;
