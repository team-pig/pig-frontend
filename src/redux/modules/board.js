import { createAction, handleActions } from "redux-actions";
import produce from "immer";

/**
 * action type
 */

const LOAD_BUCKET = "board/LOAD_BUCKET";
const CREATE_BUCKET = "board/CREATE_BUCKET";
const UPDATE_BUCKET = "board/UPDATE_BUCKET";
const DELETE_BUCKET = "board/DELETE_BUCKET";

const LOAD_CARD = "board/LOAD_CARD";
const CREATE_CARD = "board/CREATE_CARD";
const UPDATE_CARD_LOCATE = "board/UPDATE_CARD_LOCATE";
const UPDATE_CARD_LOCATE_OTHER_BUCKET = "board/UPDATE_CARD_LOCATE_OTHER_BUCKET";
const DELETE_CARD = "board/DELETE_CARD";

/**
 * action creatore
 */
const loadBucket = createAction(LOAD_BUCKET, () => ({}));
const createBucket = createAction(
  CREATE_BUCKET,
  (newBucket, newBucketOrder) => ({ newBucket, newBucketOrder })
);
const updateBucket = createAction(UPDATE_BUCKET, (newColumnOrder) => ({
  newColumnOrder,
}));
const deleteBucket = createAction(DELETE_BUCKET, (bucketId) => ({ bucketId }));

const loadCard = createAction(LOAD_CARD, () => ({}));
const createCard = createAction(
  CREATE_CARD,
  (newCard, newCardOrder, bucketId) => ({
    newCard,
    newCardOrder,
    bucketId,
  })
);
const updateCardLocate = createAction(UPDATE_CARD_LOCATE, (newBucketInfo) => ({
  newBucketInfo,
}));
const updateCardLocateOtherBucket = createAction(
  UPDATE_CARD_LOCATE_OTHER_BUCKET,
  (newBucketInfo) => ({ newBucketInfo })
);
const deleteCard = createAction(DELETE_CARD, (bucketId, newCardOrder) => ({
  bucketId,
  newCardOrder,
}));

/**
 * Thunk function
 */
let cardCnt = 2;

/**
 * bucket
 */
export const __loadBucket = () => () => {};
export const __createBucket =
  (newBucketInfo) =>
  (dispatch, getState, { history }) => {
    try {
      // 서버에서 받아올
      const newBucket = {
        id: newBucketInfo.bucketId,
        title: newBucketInfo.bucketName,
        cardIds: [],
      };

      // 서버에서 받아올
      const newBucketOrder = getState().board.columnOrder.concat(
        newBucketInfo.bucketId
      );

      dispatch(createBucket(newBucket, newBucketOrder));
    } catch (e) {
      console.log(`버킷 생성 실패! ${e}`);
    }
  };

export const __updateBucket =
  (newColumnOrder) =>
  async (dispatch, getState, { history }) => {
    try {
      // const {data} = await
      dispatch(updateBucket(newColumnOrder));
    } catch (e) {}
  };

export const __deleteBucket =
  (bucketId) =>
  async (dispatch, getState, { history }) => {
    try {
      const currentColumnOrder = getState().board.columnOrder;
      const result = currentColumnOrder.filter((item) => item !== bucketId);
      dispatch(deleteBucket(result));
    } catch (e) {
      console.log(`버킷 삭제 실패! ${e}`);
    }
  };

/**
 * card
 */
export const __loadCard = () => () => {};
export const __createCard =
  (newCardInfo) =>
  async (dispatch, getState, { history }) => {
    try {
      const { cardTitle, bucketId } = newCardInfo;
      // const { data } = await ...
      // 서버에서 받아올
      const newCard = {
        cardId: `card-${cardCnt}`,
        cardTitle: cardTitle,
      };

      // 서버에서 받아올
      const newCardOrder = getState().board.columns[bucketId].cardIds.concat(
        newCard.cardId
      );
      dispatch(createCard(newCard, newCardOrder, bucketId));
      cardCnt++;
    } catch (e) {
      console.log(`카드 생성 실패! ${e}`);
    }
  };

export const __updateCardLocate =
  (newBucket) =>
  async (dispatch, getState, { history }) => {
    // const {data} = await
    dispatch(updateCardLocate(newBucket));
  };

export const __updateCardLocateOtherBucket =
  (newBucket) => async (dispatch) => {
    try {
      // const {data} = await
      dispatch(updateCardLocateOtherBucket(newBucket));
    } catch (e) {
      console.log(`card 옮기기 실패! ${e}`);
    }
  };

export const __deleteCard =
  (bucketId, cardId) =>
  async (dispatch, getState, { history }) => {
    try {
      const currentCardOrder = getState().board.columns[bucketId].cardIds;
      const newCardOrder = currentCardOrder.filter((card) => card !== cardId);
      dispatch(deleteCard(bucketId, newCardOrder));
    } catch (e) {}
  };

/**
 * Initial State
 */
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
    },
  },
  columns: {
    "bucket-1": {
      id: "bucket-1",
      title: "버킷 1",
      cardIds: ["card-1"],
    },
  },
  columnOrder: ["bucket-1"],
};

/**
 * Reducer
 */
export const board = handleActions(
  {
    /**
     *  bucket
     */
    [LOAD_BUCKET]: (state, { payload }) =>
      produce(state, (draft) => {
        //
      }),

    [CREATE_BUCKET]: (state, { payload }) =>
      produce(state, (draft) => {
        const { newBucket, newBucketOrder } = payload;
        draft.columns[newBucket.id] = newBucket;
        draft.columnOrder = newBucketOrder;
      }),

    [UPDATE_BUCKET]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.columnOrder = payload.newColumnOrder;
      }),

    [DELETE_BUCKET]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.columnOrder = payload.bucketId;
      }),

    /**
     *  card
     */
    [LOAD_CARD]: (state, { payload }) =>
      produce(state, (draft) => {
        //
      }),

    [CREATE_CARD]: (state, { payload }) =>
      produce(state, (draft) => {
        const { newCard, newCardOrder, bucketId } = payload;
        draft.cards[newCard.cardId] = newCard;
        draft.columns[bucketId].cardIds = newCardOrder;
      }),

    [UPDATE_CARD_LOCATE]: (state, { payload }) =>
      produce(state, (draft) => {
        const { destinationBucketId, destinationBucketOrder } =
          payload.newBucketInfo;
        draft.columns[destinationBucketId].cardIds = destinationBucketOrder;
      }),

    [UPDATE_CARD_LOCATE_OTHER_BUCKET]: (state, { payload }) =>
      produce(state, (draft) => {
        const {
          sourceBucketId,
          destinationBucketId,
          sourceBucketOrder,
          destinationBucketOrder,
        } = payload.newBucketInfo;
        draft.columns[destinationBucketId].cardIds = destinationBucketOrder;
        draft.columns[sourceBucketId].cardIds = sourceBucketOrder;
      }),

    [DELETE_CARD]: (state, { payload }) =>
      produce(state, (draft) => {
        const { bucketId, newCardOrder } = payload;
        draft.columns[bucketId].cardIds = newCardOrder;
      }),
  },
  initialState
);

export default board;
