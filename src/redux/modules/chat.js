import { createAction, handleActions } from "redux-actions";
import produce from "immer";

// action type
const LOAD_MESSAGES = "chat/LOAD_MESSAGES";
const ADD_MESSAGE = "chat/ADD_MESSAGES";
const RESET_MESSAGES = "chat/RESET_MESSAGES";

// action creator
export const loadMessages = createAction(LOAD_MESSAGES, (messages) => ({
  messages,
}));
export const addMessage = createAction(ADD_MESSAGE, (message) => ({
  message,
}));
export const resetMessages = createAction(RESET_MESSAGES);

// initialState
const initialState = {
  messages: [],
};

// reducer
const chat = handleActions(
  {
    [LOAD_MESSAGES]: (state, action) =>
      produce(state, (draft) => {
        console.log(state);
        draft.messages = [...action.payload.messages, ...state.messages];
      }),
    [ADD_MESSAGE]: (state, action) =>
      produce(state, (draft) => {
        draft.messages.push(action.payload.message);
      }),
    [RESET_MESSAGES]: (state, action) =>
      produce(state, (draft) => {
        draft.messages = [];
      }),
  },
  initialState
);

export default chat;
