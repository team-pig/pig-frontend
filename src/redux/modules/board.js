import { createAction, handleActions } from "redux-actions";
import produce from "immer";

import { bucketApi } from "../../api/bucketApi";

/**
 * action type
 */
const LOAD_BUCKET = "board/LOAD_BUCKET";
const CREATE_BUCKET = "board/CREATE_BUCKET";
const UPDATE_BUCKET = "board/UPDATE_BUCKET";
const UPDATE_BUCKET_TITLE = "board/UPDATE_BUCKET_TITLE";
const DELETE_BUCKET = "board/DELETE_BUCKET";

const LOAD_CARD = "board/LOAD_CARD";
const CREATE_CARD = "board/CREATE_CARD";
const UPDATE_CARD_LOCATE = "board/UPDATE_CARD_LOCATE";
const UPDATE_CARD_LOCATE_OTHER_BUCKET = "board/UPDATE_CARD_LOCATE_OTHER_BUCKET";
const DELETE_CARD = "board/DELETE_CARD";

/**
 * action creatore
 */
const loadBucket = createAction(
  LOAD_BUCKET,
  (loadedBuckets, loadedBucketOrder) => ({
    loadedBuckets,
    loadedBucketOrder,
  })
);
const createBucket = createAction(
  CREATE_BUCKET,
  (newBucket, newBucketOrder) => ({ newBucket, newBucketOrder })
);
const updateBucket = createAction(UPDATE_BUCKET, (newColumnOrder) => ({
  newColumnOrder,
}));
const updateBucketTitle = createAction(
  UPDATE_BUCKET_TITLE,
  (bucketId, newBucketTitle) => ({
    bucketId,
    newBucketTitle,
  })
);
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

/**
 * bucket
 */

// 버킷조회
export const __loadBucket =
  (roomId) =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await bucketApi.getBuckets(roomId);
      const loadedBucketOrder =
        data.bucketOrder === null ? [] : data.bucketOrder.bucketOrder;
      const buckets = data.buckets;

      const loadedBuckets = {};
      buckets.forEach((bucket) => {
        loadedBuckets[bucket.bucketId] = bucket;
      });

      dispatch(loadBucket(loadedBuckets, loadedBucketOrder));
    } catch (e) {
      console.log(`버킷 불러오기 실패 ${e}`);
    }
  };

// 버킷생성
export const __createBucket =
  (roomId, bucketName) =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await bucketApi.createBucket(roomId, bucketName);

      // 서버에서 받았으면 좋겠다.
      const newBucket = {
        bucketId: data.bucketId,
        bucketName: bucketName,
        cardOrder: [],
      };

      // 서버에서 받았으면 좋겠다.
      const newBucketOrder = getState().board.columnOrder.concat(data.bucketId);
      dispatch(createBucket(newBucket, newBucketOrder));
    } catch (e) {
      console.log(`버킷 생성 실패! ${e}`);
    }
  };

// 버킷수정
export const __updateBucket =
  (roomId, bucketId, bucketName, bucketOrder) =>
  async (dispatch, getState, { history }) => {
    try {
      await bucketApi.editBucketAll(roomId, bucketId, bucketName, bucketOrder);
      dispatch(updateBucket(bucketOrder));
    } catch (e) {
      console.log(`버킷 옮기기 실패! ${e}`);
    }
  };

// 버킷이름수정
export const __updateBucketTitle =
  (roomId, bucketId, newBucketTitle) =>
  async (dispatch, getState, { history }) => {
    try {
      await bucketApi.editBucketTitle(roomId, bucketId, newBucketTitle);
      dispatch(updateBucketTitle(bucketId, newBucketTitle));
    } catch (e) {}
  };

// 버킷삭제
export const __deleteBucket =
  (roomId, bucketId) =>
  async (dispatch, getState, { history }) => {
    try {
      await bucketApi.deleteBucket(roomId, bucketId);
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

let cardCnt = 2;
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
      const newCardOrder = getState().board.columns[bucketId].cardOrder.concat(
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
      const currentCardOrder = getState().board.columns[bucketId].cardOrder;
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
  columns: null,
  columnOrder: null,
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
        draft.columns = payload.loadedBuckets;
        draft.columnOrder = payload.loadedBucketOrder;
      }),

    [CREATE_BUCKET]: (state, { payload }) =>
      produce(state, (draft) => {
        const { newBucket, newBucketOrder } = payload;
        draft.columns[newBucket.bucketId] = newBucket;
        draft.columnOrder = newBucketOrder;
      }),

    [UPDATE_BUCKET]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.columnOrder = payload.newColumnOrder;
      }),

    [UPDATE_BUCKET_TITLE]: (state, { payload }) =>
      produce(state, (draft) => {
        console.log(payload);
        const { bucketId, newBucketTitle } = payload;
        draft.columns[bucketId].bucketName = newBucketTitle;
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
        draft.columns[bucketId].cardOrder = newCardOrder;
      }),

    [UPDATE_CARD_LOCATE]: (state, { payload }) =>
      produce(state, (draft) => {
        const { destinationBucketId, destinationBucketOrder } =
          payload.newBucketInfo;
        draft.columns[destinationBucketId].cardOrder = destinationBucketOrder;
      }),

    [UPDATE_CARD_LOCATE_OTHER_BUCKET]: (state, { payload }) =>
      produce(state, (draft) => {
        const {
          sourceBucketId,
          destinationBucketId,
          sourceBucketOrder,
          destinationBucketOrder,
        } = payload.newBucketInfo;
        draft.columns[destinationBucketId].cardOrder = destinationBucketOrder;
        draft.columns[sourceBucketId].cardOrder = sourceBucketOrder;
      }),

    [DELETE_CARD]: (state, { payload }) =>
      produce(state, (draft) => {
        const { bucketId, newCardOrder } = payload;
        draft.columns[bucketId].cardOrder = newCardOrder;
      }),
  },
  initialState
);

export default board;
