import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { todoApi } from "../../api/todoApi";

const LOAD_TODOS = "todos/LOAD_TODOS";
const CREATE_TODO = "todos/CREATE_TODO";
const DELETE_TODO = "todos/DELETE_TODO";
const EDIT_TODO_TITLE = "todos/EDIT_TODO_TITLE";
const IS_CHECKED_TODO = "todos/IS_CHECKED_TODO";
const ADD_MEMBER = "todos/ADD_MEMBER";
const REMOVE_MEMBER = "todos/REMOVE_MEMBER";

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

const addMember = createAction(ADD_MEMBER, (todoId, member) => ({
  todoId,
  member,
}));
const removeMember = createAction(REMOVE_MEMBER, (todoId, memberId) => ({
  todoId,
  memberId,
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
      members: [],
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

export const __addMember = (roomId, todoId, members) => async (dispatch) => {
  try {
    await todoApi.addMember(roomId, todoId, members);
    dispatch(addMember(todoId, { memberId: members }));
  } catch (e) {
    console.log(e);
  }
};

export const __removeMember =
  (roomId, todoId, memberId) => async (dispatch) => {
    await todoApi.removeMember(roomId, todoId, memberId);
    dispatch(removeMember(todoId, memberId));
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
    [ADD_MEMBER]: (state, { payload }) =>
      produce(state, (draft) => {
        const { todoId, member } = payload;
        const targetIdx = state.todos.findIndex(
          (todo) => todo.todoId === todoId
        );
        draft.todos[targetIdx].members.push(member);
      }),

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
        console.log(newTodoTitle);
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

    [REMOVE_MEMBER]: (state, { payload }) =>
      produce(state, (draft) => {
        const { todoId, memberId } = payload;

        const targetIdx = state.todos.findIndex(
          (todo) => todo.todoId === todoId
        );
        const targetMember = state.todos[targetIdx].members.findIndex(
          (member) => member.memberId === memberId
        );
        draft.todos[targetIdx].members.splice(targetMember, 1);
      }),
  },

  initialState
);

export default todos;
