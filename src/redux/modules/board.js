import { createAction, handleActions } from "redux-actions";
import produce from "immer";

//action
const SET_BOARD = "board/SET_BOARD";
const EDIT_BUCKET_ALL = "board/EDIT_BUCKET_ALL";
const UPDATE_CARD_LOCATE = "board/UPDATE_CARD_LOCATE";
//
const UPDATE_BUCKET = "board/UPDATE_BUCKET";
const DELETE_BUCKET = "board/DELETE_BUCKET";

//action creator
export const setBoard = createAction(SET_BOARD, (bucket) => ({ bucket }));
export const updateBucket = createAction(UPDATE_BUCKET, (bucket) => ({
  bucket,
}));
export const updateCardLocate = createAction(UPDATE_CARD_LOCATE, (bucket) => ({
  bucket,
}));

//
export const deleteBucket = createAction(DELETE_BUCKET, (bucket) => ({
  bucket,
}));
export const editBucket = createAction(EDIT_BUCKET_ALL, (bucket) => ({
  bucket,
}));

// thunk
export const __createBucket =
  (newColumnOrder) =>
  (dispatch, getState, { history }) => {
    try {
      // const {data} =
      dispatch(updateBucket(newColumnOrder));
    } catch (e) {
      console.log(`버킷 생성 실패 ! ${e}`);
    }
  };

export const __updateCardLocate =
  (newBucket) =>
  async (dispatch, getState, { history }) => {
    // const {data} = await
    console.log(newBucket);
    dispatch(updateCardLocate(newBucket));
  };

//initialState
const initialState = {
  cards: {
    "card-1": {
      cardId: "card-1",
      cardTitle: "React.js 공부 하기",
      startDate: "2021-07-01",
      endDate: "2021-07-07",
      desc: "이번 1주일동안 리액트를 공부하겠습니다.",
      taskMembers: [],
      createdAt: "2021-07-01",
      modifiedAt: "2021-07-01",
      allMember: [{ memberId: "1", memeberName: "with" }],
      todos: [
        {
          todoId: "1",
          todoTitle: "asdf",
          isDone: false,
          members: [],
        },
      ],
    },
  },
  columns: {
    "bucket-1": {
      id: "bucket-1",
      title: "버킷 1",
      cardIds: ["card-1"],
    },

    "bucket-2": {
      id: "bucket-2",
      title: "버킷 1",
      cardIds: [],
    },
  },
  columnOrder: ["bucket-1", "bucket-2"],
};

export const board = handleActions(
  {
    [SET_BOARD]: (state, { payload }) =>
      produce(state, (draft) => {
        const { cards, columns, columnOrder } = payload.bucket;
        draft.cards = cards;
        draft.columns = columns;
        draft.columnOrder = columnOrder;
      }),
    [UPDATE_BUCKET]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.columnOrder = payload.bucket;
      }),
    [UPDATE_CARD_LOCATE]: (state, { payload }) =>
      produce(state, (draft) => {
        const {
          sourceBucketId,
          destinationBucketId,
          sourceBucketOrder,
          destinationBucketOrder,
        } = payload.bucket;
        //
        draft.columns[destinationBucketId].cardIds = destinationBucketOrder;
      }),
  },
  initialState
);

export default board;
