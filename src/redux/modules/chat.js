import { createAction, handleActions } from "redux-actions";
import produce from "immer";

// action type
const LOAD_MESSAGES = "chat/LOAD_MESSAGES";
const ADD_MESSAGE = "chat/ADD_MESSAGES";
const RESET_MESSAGES = "chat/RESET_MESSAGES";
const SET_PREV_ROOMID = "chat/SET_PREVROOM_ID";

// action creator
export const loadMessages = createAction(LOAD_MESSAGES, (messages) => ({
  messages,
}));
export const addMessage = createAction(ADD_MESSAGE, (message) => ({
  message,
}));
export const resetMessages = createAction(RESET_MESSAGES);
export const setPrevRoomId = createAction(SET_PREV_ROOMID, (newId) => ({
  newId,
}));

// initialState
const initialState = {
  messages: [],
  prevLoadRoomId: null,
};

// reducer
const chat = handleActions(
  {
    [LOAD_MESSAGES]: (state, action) =>
      produce(state, (draft) => {
        draft.messages = action.payload.messages;
      }),
    [ADD_MESSAGE]: (state, action) =>
      produce(state, (draft) => {
        draft.messages.push(action.payload.message);
      }),
    [RESET_MESSAGES]: (state, action) =>
      produce(state, (draft) => {
        draft.messages = [];
      }),
    [SET_PREV_ROOMID]: (state, action) =>
      produce(state, (draft) => {
        draft.prevLoadRoomId = action.payload.newId;
      }),
  },
  initialState
);

export default chat;
