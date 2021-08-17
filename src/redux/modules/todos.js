import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { todoApi } from "../../api/todoApi";

const LOAD_TODOS = "todos/LOAD_TODOS";
const LOAD_MY_TODOS = "todos/LOAD_MY_TODOS";
const CREATE_TODO = "todos/CREATE_TODO";
const DELETE_TODO = "todos/DELETE_TODO";
const EXIT_MY_TODO = "totos/EXIT_MY_TODO";
const EXIT_MY_TODO_NOT_CHECKED = "todos/EXIT_MY_TODO_NOT_CHECKED";
const EDIT_TODO_TITLE = "todos/EDIT_TODO_TITLE";
const IS_CHECKED_TODO = "todos/IS_CHECKED_TODO";
const GO_TO_CHECKED = "todos/GO_TO_CHECKED";
const GO_TO_NOT_CHECKED = "todos/GO_TO_NOT_CHECKED";
const ADD_MEMBER = "todos/ADD_MEMBER";
const REMOVE_MEMBER = "todos/REMOVE_MEMBER";
const RESET_TODOS = "todos/RESET_TODOS";

/**
 * Action creator
 */
const laodTodos = createAction(LOAD_TODOS, (todos) => ({ todos }));
const loadMyTodos = createAction(
  LOAD_MY_TODOS,
  (checkedTodo, notCheckedTodo) => ({ checkedTodo, notCheckedTodo })
);

const createTodo = createAction(CREATE_TODO, (newTodo) => ({
  newTodo,
}));
const deleteTodo = createAction(DELETE_TODO, (todoId) => ({ todoId }));
const exitMyTodo = createAction(EXIT_MY_TODO, (todoId) => ({ todoId }));
const exitMyTodoNotChecked = createAction(
  EXIT_MY_TODO_NOT_CHECKED,
  (todoId) => ({ todoId })
);

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

const goToChecked = createAction(
  GO_TO_CHECKED,
  (todoId, isChecked, todoTitle) => ({
    todoId,
    isChecked,
    todoTitle,
  })
);

const goToNotChecked = createAction(
  GO_TO_NOT_CHECKED,
  (todoId, isChecked, todoTitle) => ({
    todoId,
    isChecked,
    todoTitle,
  })
);

export const resetTodos = createAction(RESET_TODOS, () => ({}));

/**
 * Thunk
 */
export const __loadTodos = (roodId, cardId) => async (dispatch, getState) => {
  try {
    const { data } = await todoApi.getTodo(roodId, cardId);
    dispatch(laodTodos(data.todos));
  } catch (e) {
    console.log(e);
  }
};

export const __loadMyTodos = (roomId) => async (dispatch) => {
  try {
    const {
      data: { result },
    } = await todoApi.loadMyTodo(roomId);

    dispatch(loadMyTodos(result.checked, result.notChecked));
  } catch (e) {
    console.log(e);
  }
};

export const __createTodo = (roomId, todoInfo) => async (dispatch) => {
  try {
    const { data } = await todoApi.createTodo(roomId, todoInfo);
    const newTodo = {
      todoId: data.todoId,
      todoTitle: todoInfo.todoTitle,
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
  (roomId, todoId, isChecked) => async (dispatch, getState) => {
    try {
      await todoApi.checkedTodo(roomId, todoId, isChecked);
      dispatch(isCheckedTodo(todoId, isChecked));
    } catch (e) {
      console.log(e);
    }
  };

export const __switchTodoStat =
  (roomId, todoId, isChecked, todoTitle) => async (dispatch) => {
    try {
      await todoApi.checkedTodo(roomId, todoId, isChecked);

      if (isChecked) {
        dispatch(goToChecked(todoId, isChecked, todoTitle));
      } else {
        dispatch(goToNotChecked(todoId, isChecked, todoTitle));
      }
    } catch (e) {
      console.log(e);
    }
  };

export const __removeMyTodo =
  (roomId, todoId, memberId, isChecked) => async (dispatch) => {
    try {
      await todoApi.removeMember(roomId, todoId, memberId);
      if (isChecked) {
        dispatch(exitMyTodo(todoId));
      } else {
        dispatch(exitMyTodoNotChecked(todoId));
      }
    } catch (e) {
      console.log(e);
    }
  };

export const __memberHandler =
  (roomId, todoId, memberName) => async (dispatch, getState) => {
    const memberList = getState().member.allMembers;
    const currentTodo = getState().todos.todos;
    const targetIdx = memberList.findIndex(
      (item) => item.memberName === memberName
    );

    const targetMemberInfo = memberList[targetIdx];
    const targetMemberId = memberList[targetIdx].memberId;
    const targetTodo = currentTodo.findIndex((todo) => todo.todoId === todoId);
    const isMemberFromTodo = currentTodo[targetTodo].members.findIndex(
      (member) => member.memberName === memberName
    );

    if (isMemberFromTodo === -1) {
      await todoApi.addMember(roomId, todoId, targetMemberId);
      dispatch(addMember(todoId, targetMemberInfo));
    } else {
      await todoApi.removeMember(roomId, todoId, targetMemberId);
      dispatch(removeMember(todoId, targetMemberId));
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
  checkedTodo: [],
  notCheckedTodo: [],
  myTodoCount: { total: 0, checkedTodo: 0, notCheckedTodo: 0 },
};

export const todos = handleActions(
  {
    [LOAD_TODOS]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.todos = payload.todos;
      }),

    [LOAD_MY_TODOS]: (state, { payload }) =>
      produce(state, (draft) => {
        const { checkedTodo, notCheckedTodo } = payload;
        draft.checkedTodo = checkedTodo;
        draft.notCheckedTodo = notCheckedTodo;
        draft.myTodoCount["total"] = checkedTodo.length + notCheckedTodo.length;
        draft.myTodoCount["checkedTodo"] = checkedTodo.length;
        draft.myTodoCount["notCheckedTodo"] = notCheckedTodo.length;
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

    [GO_TO_CHECKED]: (state, { payload }) =>
      produce(state, (draft) => {
        const { todoId, isChecked, todoTitle } = payload;
        const targetTodo = state.notCheckedTodo.findIndex(
          (todo) => todo.todoId === todoId
        );

        draft.myTodoCount["checkedTodo"] = state.myTodoCount["checkedTodo"] + 1;
        draft.myTodoCount["notCheckedTodo"] =
          state.myTodoCount["notCheckedTodo"] - 1;
        draft.checkedTodo.push({ todoId, isChecked, todoTitle });
        draft.notCheckedTodo.splice(targetTodo, 1);
      }),

    [GO_TO_NOT_CHECKED]: (state, { payload }) =>
      produce(state, (draft) => {
        const { todoId, isChecked, todoTitle } = payload;
        const targetTodo = state.checkedTodo.findIndex(
          (todo) => todo.todoId === todoId
        );
        draft.myTodoCount["checkedTodo"] = state.myTodoCount["checkedTodo"] - 1;
        draft.myTodoCount["notCheckedTodo"] =
          state.myTodoCount["notCheckedTodo"] + 1;
        draft.notCheckedTodo.push({ todoId, isChecked, todoTitle });
        draft.checkedTodo.splice(targetTodo, 1);
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

    [EXIT_MY_TODO]: (state, { payload }) =>
      produce(state, (draft) => {
        const { todoId } = payload;
        const targetTodo = state.checkedTodo.findIndex(
          (todo) => todo.todoId === todoId
        );
        draft.checkedTodo.splice(targetTodo, 1);
        draft.myTodoCount["checkedTodo"] = state.myTodoCount["checkedTodo"] - 1;
        draft.myTodoCount["total"] = state.myTodoCount["total"] - 1;
      }),

    [EXIT_MY_TODO_NOT_CHECKED]: (state, { payload }) =>
      produce(state, (draft) => {
        const { todoId } = payload;
        const targetTodo = state.notCheckedTodo.findIndex(
          (todo) => todo.todoId === todoId
        );
        draft.notCheckedTodo.splice(targetTodo, 1);
        draft.myTodoCount["total"] = state.myTodoCount["total"] - 1;
      }),

    [ADD_MEMBER]: (state, { payload }) =>
      produce(state, (draft) => {
        const { todoId, member } = payload;
        const targetIdx = state.todos.findIndex(
          (todo) => todo.todoId === todoId
        );
        draft.todos[targetIdx].members.push(member);
      }),

    [RESET_TODOS]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.todos = [];
      }),
  },

  initialState
);

export default todos;
