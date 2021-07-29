import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { docApi } from "../../api/docApi";

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
  (roomId) =>
  async (dispatch, getState, { history }) => {
    try {
      const {
        data: { ok, message, result: docs },
      } = await docApi.getDocs(roomId);

      if (!ok) {
        console.log(message);
        return;
      }

      const newDocs = docs.map((doc) => ({
        title: doc.title,
        content: doc.content,
        docId: doc.documentId,
      }));

      dispatch(getDocs(newDocs));
    } catch (e) {
      console.log("문서 목록을 불러오지 못했습니다.", e);
    }
  };

// document 생성 thunk 함수
// docObj : title, content(html형태)
export const __createDoc =
  (docObj, roomId) =>
  async (dispatch, getState, { history }) => {
    try {
      const {
        data: { ok, message, documentId },
      } = await docApi.createDoc(roomId, docObj);

      if (!ok) {
        // 에러 모달 필요(에러 모달 함수를 따로 빼서 재사용하는 것이 좋을 듯 합니다.)
        console.log(message);
        return;
      }

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
      const { ok, message } = await docApi.editDoc(roomId, docObj);

      if (!ok) {
        console.log(message);
        return;
      }

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
      const { ok, message } = await docApi.deleteDoc(roomId);

      if (!ok) {
        console.log(message);
        return;
      }

      dispatch(deleteDoc(docId));
      history.replace(`/workplace/${roomId}/doc/3`);
    } catch (e) {
      console.log("문서 삭제에 실패했습니다.", e);
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
    [CREATE_DOC]: (state, action) =>
      produce(state, (draft) => {
        draft.docList.unshift(action.payload.doc.newDocObj);
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
