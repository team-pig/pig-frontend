import { createAction, handleActions } from "redux-actions";
import produce from "immer";

const LOAD_TODOS = "todos/LOAD_TODOS";
const CREATE_TODO = "todos/CREATE_TODO";
const DELETE_TODO = "todos/DELETE_TODO";
const EDIT_TODO = "todos/EDIT_TODO";

/**
 * Action creator
 */
const laodTodos = createAction(LOAD_TODOS, () => ({}));
const createTodo = createAction(CREATE_TODO, (cardId, newTodoTitle) => ({
  cardId,
  newTodoTitle,
}));
const deleteTodo = createAction(DELETE_TODO, (todoId) => ({ todoId }));
const editTodo = createAction(EDIT_TODO, (todoId, newTodoTitle) => ({
  todoId,
  newTodoTitle,
}));

/**
 * Thunk
 */
export const __loadTodos =
  () =>
  async (dispatch, getState, { history }) => {
    // conat { data } = await
    // dispatch();
  };

export const __createTodo =
  (cardId, todoTitle) =>
  async (dispatch, getState, { history }) => {
    dispatch(createTodo(cardId, todoTitle));
  };

export const __editToto =
  (todoId, newTodoTitle, isChecked) =>
  async (dispatch, getState, { history }) => {
    dispatch(editTodo(todoId, newTodoTitle));
  };

export const __deleteTodo =
  (todoId) =>
  async (dispatch, getState, { history }) => {
    // const {data} = await
    dispatch(deleteTodo(todoId));
  };

const initialState = {
  todos: [
    {
      todoId: "todo-1",
      todoTitle: "모던 자바스크립트 deep dive 책 사기",
      isChecked: false,
      members: [
        {
          memberId: "user-1",
          memberName: "예상기",
        },
      ],
    },
  ],
};

let todoCnt = 2;
export const todos = handleActions(
  {
    [LOAD_TODOS]: (state, { payload }) => produce(state, (draft) => {}),
    [CREATE_TODO]: (state, { payload }) =>
      produce(state, (draft) => {
        const { newTodoTitle } = payload;
        const newTodo = {
          todoId: `todo-${todoCnt}`,
          todoTitle: newTodoTitle,
          isChecked: false,
          members: [
            {
              memberId: "",
              memberName: "예상기",
            },
          ],
        };
        draft.todos.push(newTodo);
        todoCnt++;
      }),
    [DELETE_TODO]: (state, { payload }) =>
      produce(state, (draft) => {
        const targetIdx = state.todos.findIndex(
          (todo) => todo.todoId === payload.todoId
        );
        draft.todos.splice(targetIdx, 1);
      }),
    [EDIT_TODO]: (state, { payload }) =>
      produce(state, (draft) => {
        const { todoId, newTodoTitle } = payload;
        const targetIdx = state.todos.findIndex(
          (todo) => todo.todoId === todoId
        );
        draft.todos[targetIdx].todoTitle = newTodoTitle;
      }),
  },
  initialState
);

export default todos;
