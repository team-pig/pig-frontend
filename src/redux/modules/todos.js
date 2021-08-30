import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { todoApi } from "../../api/todoApi";
import { regex } from "../../shared/regex";
import { __reqError } from "./error";

// [보드 / 타임라인]
const LOAD_TODOS = "todos/LOAD_TODOS";
const LOAD_MY_TODOS = "todos/LOAD_MY_TODOS";
const CREATE_TODO = "todos/CREATE_TODO";
const DELETE_TODO = "todos/DELETE_TODO";
const EDIT_TODO_TITLE = "todos/EDIT_TODO_TITLE";
const IS_CHECKED_TODO = "todos/IS_CHECKED_TODO";
const ADD_MEMBER = "todos/ADD_MEMBER";
const REMOVE_MEMBER = "todos/REMOVE_MEMBER";
const RESET_TODOS = "todos/RESET_TODOS";

// [메인]
const EXIT_MY_TODO = "totos/EXIT_MY_TODO";
const EXIT_MY_TODO_NOT_CHECKED = "todos/EXIT_MY_TODO_NOT_CHECKED";
const GO_TO_CHECKED = "todos/GO_TO_CHECKED";
const GO_TO_NOT_CHECKED = "todos/GO_TO_NOT_CHECKED";
const LOAD_PROJECT_TODOS = "todos/LOAD_PROJECT_TODOS";
const EIDT_MY_STATUS = "todos/EIDT_MY_STATUS";

// clean up
const INIT_MY_TODOS = "todos/INIT_MY_TODOS";

/**
 *  ---- Action creator ---- //
 */

/**
 * ---- 클린 업 ---- //
 */

export const initMyTodos = createAction(INIT_MY_TODOS, () => ({}));

// [메인]
const laodTodos = createAction(LOAD_TODOS, (todos) => ({ todos }));

const editMyStatus = createAction(EIDT_MY_STATUS, (myStatus) => ({ myStatus }));

const loadMyTodos = createAction(
  LOAD_MY_TODOS,
  (checkedTodo, notCheckedTodo) => ({ checkedTodo, notCheckedTodo })
);
const loadProjectTodo = createAction(LOAD_PROJECT_TODOS, (allTodos) => ({
  allTodos,
}));

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

const addMember = createAction(
  ADD_MEMBER,
  (todoId, member, color, avatar, nickname) => ({
    todoId,
    member,
    color,
    avatar,
    nickname,
  })
);
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
    dispatch(__reqError(e));
  }
};

export const __loadMyTodos = (roomId) => async (dispatch) => {
  try {
    const {
      data: { result },
    } = await todoApi.loadMyTodo(roomId);

    dispatch(loadMyTodos(result.checked, result.notChecked));
  } catch (e) {
    dispatch(__reqError(e));
  }
};

export const __loadProjectTodo = (roomId) => async (dispatch, getState) => {
  try {
    const { data } = await todoApi.loadProjectTodo(roomId);
    const { memberStatus, projectStatus, myStatus } = data;
    dispatch(loadProjectTodo({ memberStatus, projectStatus, myStatus }));
  } catch (e) {
    dispatch(__reqError(e));
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
      dispatch(__reqError(e));
    }
  };

export const __checkedTodo =
  (roomId, todoId, isChecked) => async (dispatch) => {
    try {
      await todoApi.checkedTodo(roomId, todoId, isChecked);
      dispatch(isCheckedTodo(todoId, isChecked));
    } catch (e) {
      dispatch(__reqError(e));
    }
  };

export const __switchTodoStat =
  (roomId, todoId, isChecked, todoTitle) => async (dispatch) => {
    try {
      await todoApi.checkedTodo(roomId, todoId, isChecked);
      dispatch(__loadProjectTodo(roomId));
      if (isChecked) {
        dispatch(goToChecked(todoId, isChecked, todoTitle));
      } else {
        dispatch(goToNotChecked(todoId, isChecked, todoTitle));
      }
    } catch (e) {
      dispatch(__reqError(e));
    }
  };

export const __removeMyTodo =
  (roomId, todoId, memberId, isChecked) => async (dispatch) => {
    try {
      await todoApi.removeMember(roomId, todoId, memberId);
      dispatch(__loadProjectTodo(roomId));
      if (isChecked) {
        dispatch(exitMyTodo(todoId));
      } else {
        dispatch(exitMyTodoNotChecked(todoId));
      }
    } catch (e) {
      dispatch(__reqError(e));
    }
  };

export const __memberHandler =
  (roomId, todoId, userId, color, avatar, nickname) =>
  async (dispatch, getState) => {
    const currentTodo = getState().todos.todos;

    const targetTodoIndex = currentTodo.findIndex(
      (todo) => todo.todoId === todoId
    );

    const thisTodoMemberList = currentTodo[targetTodoIndex].members;
    const includeIndex = thisTodoMemberList.findIndex(
      (member) => member.memberId === userId
    );

    if (includeIndex === -1) {
      await todoApi.addMember(roomId, todoId, userId);
      dispatch(addMember(todoId, userId, color, avatar, nickname));
    } else {
      await todoApi.removeMember(roomId, todoId, userId);
      dispatch(removeMember(todoId, userId));
    }
  };

export const __deleteTodo = (roomId, todoId) => async (dispatch) => {
  try {
    await todoApi.deleteTodo(roomId, todoId);
    dispatch(deleteTodo(todoId));
  } catch (e) {
    dispatch(__reqError(e));
  }
};

export const __editMyStatus = (roomId, newMyInfo) => async (dispatch) => {
  try {
    const filterTags =
      typeof newMyInfo.tags === "object"
        ? newMyInfo.tags
        : newMyInfo.tags.split(regex.commaAndTrim).filter(Boolean);

    const willReqParams = {
      ...newMyInfo,
      tags: filterTags,
    };

    dispatch(editMyStatus(willReqParams));
    await todoApi.editMyStatus(roomId, willReqParams);
  } catch (e) {
    dispatch(__reqError(e));
  }
};

const initialState = {
  todos: [], // LOAD_TODOS
  checkedTodo: [], // LOAD_MY_TODOS
  notCheckedTodo: [], // LOAD_MY_TODOS
  memberStatus: [], // LOAD_PROJECT_TODOS
  projectStatus: {}, // LOAD_PROJECT_TODOS
  myStatus: {}, //LOAD_PROJECT_TODOS
};

export const todos = handleActions(
  {
    /**
     * [board] Todo.jsx
     */
    [ADD_MEMBER]: (state, { payload }) =>
      produce(state, (draft) => {
        const { todoId, member, color, avatar, nickname } = payload;
        const targetIdx = state.todos.findIndex(
          (todo) => todo.todoId === todoId
        );
        draft.todos[targetIdx].members.push({
          memberId: member,
          color,
          avatar,
          nickname,
          memberName: nickname,
          isChecked: true,
        });
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

    [LOAD_TODOS]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.todos = payload.todos;
      }),

    [LOAD_MY_TODOS]: (state, { payload }) =>
      produce(state, (draft) => {
        const { checkedTodo, notCheckedTodo } = payload;
        draft.checkedTodo = checkedTodo;
        draft.notCheckedTodo = notCheckedTodo;
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

    /**
     * [main] myTodos.jsx
     */
    [GO_TO_CHECKED]: (state, { payload }) =>
      produce(state, (draft) => {
        const { todoId, isChecked, todoTitle } = payload;
        const targetTodo = state.notCheckedTodo.findIndex(
          (todo) => todo.todoId === todoId
        );

        draft.checkedTodo.push({ todoId, isChecked, todoTitle });
        draft.notCheckedTodo.splice(targetTodo, 1);
      }),

    [GO_TO_NOT_CHECKED]: (state, { payload }) =>
      produce(state, (draft) => {
        const { todoId, isChecked, todoTitle } = payload;
        const targetTodo = state.checkedTodo.findIndex(
          (todo) => todo.todoId === todoId
        );
        draft.notCheckedTodo.push({ todoId, isChecked, todoTitle });
        draft.checkedTodo.splice(targetTodo, 1);
      }),

    [EXIT_MY_TODO]: (state, { payload }) =>
      produce(state, (draft) => {
        const { todoId } = payload;
        const targetTodo = state.checkedTodo.findIndex(
          (todo) => todo.todoId === todoId
        );
        draft.checkedTodo.splice(targetTodo, 1);
      }),

    [EXIT_MY_TODO_NOT_CHECKED]: (state, { payload }) =>
      produce(state, (draft) => {
        const { todoId } = payload;
        const targetTodo = state.notCheckedTodo.findIndex(
          (todo) => todo.todoId === todoId
        );
        draft.notCheckedTodo.splice(targetTodo, 1);
      }),

    /**
     * [main] myStatus.jsx
     */
    [EIDT_MY_STATUS]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.myStatus.desc = payload.myStatus.desc;
        draft.myStatus.tags = payload.myStatus.tags;
      }),

    [LOAD_PROJECT_TODOS]: (state, { payload }) =>
      produce(state, (draft) => {
        const { projectStatus, memberStatus, myStatus } = payload.allTodos;
        draft.projectStatus = projectStatus;
        draft.memberStatus = memberStatus;
        draft.myStatus = myStatus;
      }),

    /**
     * clean up
     */

    [RESET_TODOS]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.todos = [];
      }),

    [INIT_MY_TODOS]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.checkedTodo = [];
        draft.notCheckedTodo = [];
        draft.memberStatus = [];
        draft.myTodoCount = {};
        draft.projectStatus = {};
        draft.myStatus = {};
      }),
  },

  initialState
);

export default todos;
