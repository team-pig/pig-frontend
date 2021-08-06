import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { todoApi } from "../../api/todoApi";

const LOAD_TODOS = "todos/LOAD_TODOS";
const CREATE_TODO = "todos/CREATE_TODO";
const DELETE_TODO = "todos/DELETE_TODO";
const EDIT_TODO_TITLE = "todos/EDIT_TODO_TITLE";
const IS_CHECKED_TODO = "todos/IS_CHECKED_TODO";

/**
 * Action creator
 */
const laodTodos = createAction(LOAD_TODOS, (todos) => ({ todos }));
const createTodo = createAction(CREATE_TODO, (newTodo) => ({
  newTodo,
}));
const deleteTodo = createAction(DELETE_TODO, (todoId) => ({ todoId }));
const editTodoTitle = createAction(EDIT_TODO_TITLE, (todoId, newTodoTitle) => ({
  todoId,
  newTodoTitle,
}));

const isCheckedTodo = createAction(IS_CHECKED_TODO, (todoId, isChecked) => ({
  todoId,
  isChecked,
}));

/**
 * Thunk
 */
export const __loadTodos = (roodId, cardId) => async (dispatch) => {
  try {
    const { data } = await todoApi.getTodo(roodId, cardId);
    dispatch(laodTodos(data.todos));
  } catch (e) {
    console.log(e);
  }
};

export const __createTodo = (roomId, cardId, todoTitle) => async (dispatch) => {
  try {
    const { data } = await todoApi.createTodo(roomId, cardId, todoTitle);
    const newTodo = {
      todoId: data.todoId,
      todoTitle,
      isChecked: false,
      members: [
        {
          memberId: "",
          memberName: "",
        },
      ],
    };
    dispatch(createTodo(newTodo));
  } catch (e) {
    console.log(`투두생성 실패! ${e}`);
  }
};

export const __editTotoTitle =
  (roomId, todoId, todoTitle) => async (dispatch) => {
    try {
      await todoApi.editTodoTtitle(roomId, todoId, todoTitle);
      dispatch(editTodoTitle(todoId, todoTitle));
    } catch (e) {
      console.log(e);
    }
  };

export const __checkedTodo =
  (roomId, todoId, isChecked) => async (dispatch) => {
    try {
      await todoApi.checkedTodo(roomId, todoId, isChecked);
      dispatch(isCheckedTodo(todoId, isChecked));
    } catch (e) {
      console.log(e);
    }
  };

export const __deleteTodo = (roomId, todoId) => async (dispatch) => {
  try {
    await todoApi.deleteTodo(roomId, todoId);
    dispatch(deleteTodo(todoId));
  } catch (e) {
    console.log(e);
  }
};

const initialState = {
  todos: [],
};

export const todos = handleActions(
  {
    [LOAD_TODOS]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.todos = payload.todos;
      }),

    [CREATE_TODO]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.todos.push(payload.newTodo);
      }),

    [DELETE_TODO]: (state, { payload }) =>
      produce(state, (draft) => {
        const targetIdx = state.todos.findIndex(
          (todo) => todo.todoId === payload.todoId
        );
        draft.todos.splice(targetIdx, 1);
      }),

    [EDIT_TODO_TITLE]: (state, { payload }) =>
      produce(state, (draft) => {
        const { todoId, newTodoTitle } = payload;
        const targetIdx = state.todos.findIndex(
          (todo) => todo.todoId === todoId
        );
        draft.todos[targetIdx].todoTitle = newTodoTitle;
      }),

    [IS_CHECKED_TODO]: (state, { payload }) =>
      produce(state, (draft) => {
        const { todoId, isChecked } = payload;
        const targetIdx = state.todos.findIndex(
          (todo) => todo.todoId === todoId
        );
        draft.todos[targetIdx].isChecked = isChecked;
      }),
  },

  initialState
);

export default todos;
