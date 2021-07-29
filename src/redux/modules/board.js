import { createAction, handleActions } from "redux-actions";

//action
// const ADD_BUCKET = "board/ADD_BUCKET";
// const ADD_TODO = "board/ADD_TODO";
// const SORT_BUCKET = "board/SORT_BUCKET";
// const SORT_TODO = "board/SORT_TODO";
const SET_BOARD = "board/SET_BOARD";
const UPDATE_TITLE = "board/UPDATE_TITLE";

//action creator
// export const addBucket = createAction(ADD_BUCKET, (board) => ({ board }));
// export const addTodo = createAction(ADD_TODO, (board) => ({ board }));
// export const sortBucket = createAction(SORT_BUCKET, (board) => ({ board }));
// export const sortTodo = createAction(SORT_TODO, (board) => ({ board }));
export const setBoard = createAction(SET_BOARD, (board) => ({ board }));
export const updateTitle = createAction(UPDATE_TITLE, (title) => ({ title }));

//initialState
const initialState = {
  tasks: {
    "todo-1": { id: "todo-1", content: "새로운 카드를 등록하세요." },
  },
  columns: {
    "bucket-1": {
      id: "bucket-1",
      title: "버킷 1",
      todoIds: ["todo-1"],
    },
  },
  columnOrder: ["bucket-1"],
};

export const board = handleActions(
  {
    [SET_BOARD]: (state, action) => {
      const { tasks, columns, columnOrder } = action.payload.board;
      return {
        ...state,
        tasks,
        columns,
        columnOrder,
      };
    },
    [UPDATE_TITLE]: (state, action) => {
      return {
        ...state,
      };
    },
  },
  initialState
);

export default board;
