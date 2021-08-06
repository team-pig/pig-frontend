import { createAction, handleActions } from "redux-actions";
import produce from "immer";

import { bucketApi } from "../../api/bucketApi";
import { cardApi } from "../../api/cardApi";

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

const loadCard = createAction(LOAD_CARD, (cards) => ({ cards }));

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
  (cardId, newBucketInfo) => ({ cardId, newBucketInfo })
);
const deleteCard = createAction(
  DELETE_CARD,
  (bucketId, newCardOrder, newCards) => ({
    bucketId,
    newCardOrder,
    newCards,
  })
);

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
      const loadedBucketOrder = data.bucketOrder.bucketOrder;
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

      const newBucket = {
        bucketId: data.bucketId,
        bucketName: bucketName,
        cardOrder: [],
      };

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

// 카드조회
export const __loadCard = (roomId) => async (dispatch) => {
  try {
    const { data } = await cardApi.getCards(roomId);
    const loadedCards = {};
    data.cards.forEach((card) => {
      loadedCards[card.cardId] = card;
    });

    dispatch(loadCard(loadedCards));
  } catch (e) {}
};

// 카드생성
export const __createCard =
  (roomId, bucketId, cardTitle) =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await cardApi.createCard(roomId, bucketId, cardTitle);
      console.log(data);

      const newCard = {
        cardId: data.cardId,
        bucketId,
        roomId,
        cardTitle,
      };

      const newCardOrder = getState().board.columns[bucketId].cardOrder.concat(
        newCard.cardId
      );

      dispatch(createCard(newCard, newCardOrder, bucketId));
    } catch (e) {
      console.log(`카드 생성 실패! ${e}`);
    }
  };

// 같은 버킷에서 카드 위치 수정
export const __updateCardLocate =
  (roomId, cardId, newBucketInfo) =>
  async (dispatch, getState, { history }) => {
    try {
      await cardApi.editCardLocationSameBucket(roomId, cardId, newBucketInfo);

      dispatch(updateCardLocate(newBucketInfo));
    } catch (e) {
      console.log(`card 옮기기 실패! ${e}`);
    }
  };

// 다른 버킷으로 카드 위치 수정
export const __updateCardLocateOtherBucket =
  (roomId, cardId, newBucketInfo) => async (dispatch) => {
    try {
      await cardApi.editCardLocation(roomId, cardId, newBucketInfo);
      dispatch(updateCardLocateOtherBucket(cardId, newBucketInfo));
    } catch (e) {
      console.log(`card 옮기기 실패! ${e}`);
    }
  };

// 카드삭제
export const __deleteCard =
  (bucketId, cardId, roomId) =>
  async (dispatch, getState, { history }) => {
    try {
      await cardApi.deleteCard(bucketId, cardId, roomId);
      // 새로운 cards
      const currentCards = getState().board.cards;
      const newCards = {};
      for (const card in currentCards) {
        if (card !== cardId) {
          newCards[card] = currentCards[card];
        }
      }

      //  버킷 안 카드오더
      const currentCardOrder = getState().board.columns[bucketId].cardOrder;
      const newCardOrder = currentCardOrder.filter((card) => card !== cardId);
      dispatch(deleteCard(bucketId, newCardOrder, newCards));
    } catch (e) {
      console.log(`카드 삭제실패! ${e}`);
    }
  };

/**
 * Initial State
 */
const initialState = {
  cards: null,
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
        draft.cards = payload.cards;
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
        console.log(sourceBucketOrder);
        console.log(destinationBucketOrder);

        draft.columns[destinationBucketId].cardOrder = destinationBucketOrder;
        draft.columns[sourceBucketId].cardOrder = sourceBucketOrder;
        draft.cards[payload.cardId].bucketId = destinationBucketId;
      }),

    [DELETE_CARD]: (state, { payload }) =>
      produce(state, (draft) => {
        const { bucketId, newCardOrder, newCards } = payload;
        draft.columns[bucketId].cardOrder = newCardOrder;
        draft.cards = newCards;
      }),
  },
  initialState
);

export default board;
