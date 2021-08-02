import { createAction, handleActions } from "redux-actions";
import produce from "immer";

const LOAD_TODOS = "todos/LOAD_TODOS";

const laodTodos = createAction(LOAD_TODOS, () => ({}));

const __laodTodos =
  () =>
  async (dispatch, getState, { history }) => {
    // conat { data } = await
    // dispatch();
  };

const __createTodo =
  () =>
  async (dispatch, getState, { history }) => {
    // const {data} = await
    // disaptch
  };

const __checkedTodo =
  () =>
  async (dispatch, getState, { history }) => {
    // const {data} = await
    // dispatch
  };

const __deleteTodo =
  () =>
  async (dispatch, getState, { history }) => {
    // const {data} = await
    // dispatch
  };

const initialState = {};
export const board = handleActions(
  {
    [LOAD_TODOS]: (state, { payload }) => produce(state, (draft) => {}),
  },
  initialState
);
