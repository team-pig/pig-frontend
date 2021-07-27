import { createAction, handleActions } from "redux-actions";
import produce from "immer";

// action
const GET_DOCS = "document/GET_DOCS";
const CREATE_DOC = "document/CREATE_DOC";
const EDIT_DOC = "document/EDIT_DOC";
const DELETE_DOC = "document/DELETE_DOC";

// action creator
const getDocs = createAction(GET_DOCS, (docs) => ({ docs }));
const createDoc = createAction(CREATE_DOC, (doc) => ({ doc }));
const editDoc = createAction(EDIT_DOC, (docId, title, content) => ({
  docId,
  title,
  content,
}));
const deleteDoc = createAction(DELETE_DOC, (docId) => ({ docId }));

// Thunk
// document list를 받아오는 thunk 함수. 동기화를 위해 pageId가 바뀔 때마다 가져옴.
export const __getDocs =
  () =>
  (dispatch, getState, { history }) => {};

// document 생성 thunk 함수
// docObj : title, content(html형태)
export const __createDoc =
  (docObj) =>
  (dispatch, getState, { history }) => {};

// document 수정 thunk 함수
// docObj : docId, title, content
export const __editDoc =
  (docObj) =>
  (dispatch, getState, { history }) => {};

// document 삭제 thunk 함수
export const __deleteDoc =
  (docId) =>
  (dispatch, getState, { history }) => {};

// initialState
const initialState = {
  docList: [],
  currentDoc: null,
  mode: {
    view: false,
    edit: false,
  },
};

// reducer

const document = handleActions(
  {
    [GET_DOCS]: (state, action) =>
      produce(state, (draft) => {
        draft.docList = action.docs;
      }),
    [CREATE_DOC]: (state, action) =>
      produce(state, (draft) => {
        draft.docList.unshift(action.payload.doc);
      }),
    [EDIT_DOC]: (state, action) =>
      produce(state, (draft) => {
        const { docId, title, content } = action.payload;
        const idx = draft.docList.findIndex((doc) => doc.docId === docId);
        draft.docList[idx].title = title;
        draft.docList[idx].content = content;
      }),
    [DELETE_DOC]: (state, action) =>
      produce(state, (draft) => {
        const idx = draft.docList.findIndex(
          (doc) => doc.docId === action.payload.docId
        );
        draft.docList.splice(idx, 1);
      }),
  },
  initialState
);

export default document;
