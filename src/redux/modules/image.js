import { createAction, handleActions } from "redux-actions";
import produce from "immer";

//action
const SET_PREVIEW = "image/SET_PREVIEW";
const UPLOAD = "image/UPLOAD";

//action creator
export const setPreview = createAction(SET_PREVIEW, (preview) => ({ preview }));
export const uploadImageToS3 = createAction(UPLOAD, (imgUrl) => ({ imgUrl }));
//initialState
const initialState = {
  preview: "",
  imgUrl: "",
};

//reducer
export const image = handleActions(
  {
    [SET_PREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.preview = action.payload.preview;
      }),
    [UPLOAD]: (state, action) =>
      produce(state, (draft) => {
        draft.imgUrl = action.payload.imgUrl;
      }),
  },
  initialState
);

export default image;
