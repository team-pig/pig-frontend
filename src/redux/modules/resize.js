import { createAction, handleActions } from "redux-actions";
import produce from "immer";

// action type
const RESIZE_DOCLIST = "resize/RESIZE_DOCLIST";
const SHOW_SIDEBAR = "resize/SHOW_SIDEBAR";

// action creator;
export const resizeDocList = createAction(RESIZE_DOCLIST, (width) => ({
  width,
}));
export const showSidebar = createAction(SHOW_SIDEBAR);

// initialState
const initialState = {
  docListWidth: 260,
  isShowSidebar: true,
};

// reducer
const resize = handleActions(
  {
    [RESIZE_DOCLIST]: (state, action) =>
      produce(state, (draft) => {
        draft.docListWidth = action.payload.width;
      }),
    [SHOW_SIDEBAR]: (state, action) =>
      produce(state, (draft) => {
        draft.isShowSidebar = !state.isShowSidebar;
      }),
  },
  initialState
);

export default resize;
