import { createAction, handleActions } from "redux-actions";
import produce from "immer";

// action type
const CHECK_MOBILE = "resize/CHECK_MOBILE";
const RESIZE_DOCLIST = "resize/RESIZE_DOCLIST";
const SHOW_SIDEBAR = "resize/SHOW_SIDEBAR";
const HIDE_SIDEBAR = "resize/HIDE_SIDEBAR";

// action creator
export const checkMobile = createAction(CHECK_MOBILE, (isMobile) => ({
  isMobile,
}));
export const resizeDocList = createAction(RESIZE_DOCLIST, (width) => ({
  width,
}));
export const showSidebar = createAction(SHOW_SIDEBAR);
export const hideSidebar = createAction(HIDE_SIDEBAR);

// initialState
const initialState = {
  isMobile: false,
  docListWidth: 260,
  isShowSidebar: true,
};

// reducer
const resize = handleActions(
  {
    [CHECK_MOBILE]: (state, action) =>
      produce(state, (draft) => {
        draft.isMobile = action.payload.isMobile;
      }),
    [RESIZE_DOCLIST]: (state, action) =>
      produce(state, (draft) => {
        draft.docListWidth = action.payload.width;
      }),
    [SHOW_SIDEBAR]: (state, action) =>
      produce(state, (draft) => {
        draft.isShowSidebar = !state.isShowSidebar;
      }),
    [HIDE_SIDEBAR]: (state, action) =>
      produce(state, (draft) => {
        draft.isShowSidebar = false;
      }),
  },
  initialState
);

export default resize;
