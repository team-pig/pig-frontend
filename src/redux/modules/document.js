import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { docApi } from "../../api/docApi";
import { __reqError } from "./error";

// action
const GET_DOCS = "document/GET_DOCS";
const GET_DOC = "document/GET_DOC";
const CREATE_DOC = "document/CREATE_DOC";
const EDIT_DOC = "document/EDIT_DOC";
const DELETE_DOC = "document/DELETE_DOC";
const RESET_DOCS = "document/RESET_DOCS";
const RESET_DOC = "document/RESET_DOC";

// action creator
const getDocs = createAction(GET_DOCS, (docs) => ({ docs }));
const getDoc = createAction(GET_DOC, (doc) => ({ doc }));
const createDoc = createAction(CREATE_DOC, (doc) => ({ doc }));
const editDoc = createAction(EDIT_DOC, (doc) => ({ doc }));
const deleteDoc = createAction(DELETE_DOC, (docId) => ({ docId }));
export const resetDocs = createAction(RESET_DOCS);
export const resetDoc = createAction(RESET_DOC);

// Thunk
// document list를 받아오는 thunk 함수. 동기화를 위해 pageId가 바뀔 때마다 가져옴.
export const __getDocs =
  (roomId) =>
  async (dispatch, getState, { history }) => {
    try {
      const {
        data: { result: docs },
      } = await docApi.getDocs(roomId);

      const newDocs = docs.map((doc) => {
        const { documentId: docId, ...rest } = doc;
        return {
          docId,
          ...rest,
        };
      });

      dispatch(getDocs(newDocs));
    } catch (e) {
      dispatch(__reqError(e));
    }
  };

export const __getDoc =
  (roomId, docId) =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await docApi.getDoc(roomId, docId);

      if (data.ok) {
        const { documentId: docId, ...rest } = data.result;
        const docObj = { docId, ...rest };
        dispatch(getDoc(docObj));
      }
    } catch (e) {
      dispatch(__reqError(e));
    }
  };

// document 생성 thunk 함수
// docObj : title, content(html형태)
export const __createDoc =
  (docObj, roomId) =>
  async (dispatch, getState, { history }) => {
    try {
      const {
        data: { documentId },
      } = await docApi.createDoc(roomId, docObj);

      const newDocObj = { ...docObj, docId: documentId };
      dispatch(createDoc({ newDocObj }));
      history.push(`/workspace/${roomId}/doc/${documentId}`);
    } catch (e) {
      console.log("문서 저장에 실패했습니다.", e);
    }
  };

// document 수정 thunk 함수
// docObj : docId, title, content
export const __editDoc =
  (docObj, roomId) =>
  async (dispatch, getState, { history }) => {
    try {
      const { title, content, docId: documentId } = docObj;
      const newDocObj = { title, content, documentId };

      const data = await docApi.editDoc(roomId, newDocObj);

      dispatch(editDoc(docObj));
      history.push(`/workspace/${roomId}/doc/${docObj.docId}`);
    } catch (e) {
      console.log("문서 수정에 실패했습니다.", e);
    }
  };

// document 삭제 thunk 함수
export const __deleteDoc =
  (docId, roomId) =>
  async (dispatch, getState, { history }) => {
    try {
      await docApi.deleteDoc(roomId, docId);

      await dispatch(deleteDoc(docId));
      const lastDoc = getState().document.docList[0];
      lastDoc
        ? history.replace(`/workspace/${roomId}/doc/${lastDoc.docId}`)
        : history.replace(`/workspace/${roomId}/doc/blank`);
    } catch (e) {
      dispatch(__reqError(e));
    }
  };

// initialState
const initialState = {
  docList: [],
  currentDoc: null,
};

// reducer

const document = handleActions(
  {
    [GET_DOCS]: (state, action) =>
      produce(state, (draft) => {
        draft.docList = action.payload.docs;
      }),
    [GET_DOC]: (state, action) =>
      produce(state, (draft) => {
        draft.currentDoc = action.payload.doc;
      }),
    [CREATE_DOC]: (state, action) =>
      produce(state, (draft) => {
        draft.docList.unshift(action.payload.doc.newDocObj);
      }),
    [EDIT_DOC]: (state, action) =>
      produce(state, (draft) => {
        const { docId, title, content } = action.payload.doc;
        const idx = draft.docList.findIndex((doc) => doc.docId === docId);
        if (idx !== -1) {
          draft.docList[idx].title = title;
          draft.docList[idx].content = content;
        }
      }),
    [DELETE_DOC]: (state, action) =>
      produce(state, (draft) => {
        const idx = draft.docList.findIndex(
          (doc) => doc.docId === action.payload.docId
        );
        draft.docList.splice(idx, 1);
      }),
    [RESET_DOCS]: (state, action) =>
      produce(state, (draft) => {
        draft.docList = [];
      }),
    [RESET_DOC]: (state, action) =>
      produce(state, (draft) => {
        draft.currentDoc = null;
      }),
  },
  initialState
);

export default document;
