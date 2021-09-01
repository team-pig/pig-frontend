import { createAction, handleActions } from "redux-actions";
import produce from "immer";

import { bucketApi } from "../../api/bucketApi";
import { cardApi } from "../../api/cardApi";
import { __reqError } from "./error";
import { editSchedule, loadCardByIdToCalendar } from "./calendar";

/**
 * action type
 */
const LOAD_BUCKET = "board/LOAD_BUCKET";
const CREATE_BUCKET = "board/CREATE_BUCKET";
const UPDATE_BUCKET = "board/UPDATE_BUCKET";
const UPDATE_BUCKET_TITLE = "board/UPDATE_BUCKET_TITLE";
const DELETE_BUCKET = "board/DELETE_BUCKET";

const LOAD_CARD = "board/LOAD_CARD";
const LOAD_CARD_BY_ID = "board/LOAD_CARD_BY_ID";
const CREATE_CARD = "board/CREATE_CARD";
const UPDATE_CARD_LOCATE = "board/UPDATE_CARD_LOCATE";
const UPDATE_CARD_LOCATE_OTHER_BUCKET = "board/UPDATE_CARD_LOCATE_OTHER_BUCKET";
const UPDATE_CARD_INFOS = "board/UPDATE_CARD_INFOS";
const DELETE_CARD = "board/DELETE_CARD";
const RESET_CARD = "board/RESET_CARD";

const INIT_BOARD = "board/INIT_BOARD";

/**
 * action creatore
 */

export const initBoard = createAction(INIT_BOARD, () => ({}));

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

export const loadCardById = createAction(LOAD_CARD_BY_ID, (card) => ({
  card,
}));

const createCard = createAction(
  CREATE_CARD,
  (newCard, newCardOrder, bucketId) => ({
    newCard,
    newCardOrder,
    bucketId,
  })
);

const updateCardLocate = createAction(
  UPDATE_CARD_LOCATE,
  (cardId, newBucketInfo) => ({
    cardId,
    newBucketInfo,
  })
);

export const updateCardLocateOtherBucket = createAction(
  UPDATE_CARD_LOCATE_OTHER_BUCKET,
  (cardId, newBucketInfo) => ({ cardId, newBucketInfo })
);

const editCardInfos = createAction(UPDATE_CARD_INFOS, (paramInfos) => ({
  paramInfos,
}));

const deleteCard = createAction(
  DELETE_CARD,
  (bucketId, newCardOrder, newCards) => ({
    bucketId,
    newCardOrder,
    newCards,
  })
);

export const resetCard = createAction(RESET_CARD);

/**
 * Thunk function
 */

/**
 * bucket
 */
// 버킷조회
export const __loadBucket = (roomId) => async (dispatch) => {
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
  (roomId, bucketName) => async (dispatch, getState) => {
    try {
      const { data } = await bucketApi.createBucket(roomId, bucketName);

      const newBucket = {
        bucketId: data.bucketId,
        bucketName: bucketName,
        cardOrder: [],
      };

      const newBucketOrder = getState().board.columnOrder;
      dispatch(createBucket(newBucket, newBucketOrder));
    } catch (e) {
      console.log(`버킷 생성 실패! ${e}`);
    }
  };

// 버킷수정
export const __updateBucket =
  (roomId, bucketId, bucketName, bucketOrder) => async (dispatch) => {
    try {
      dispatch(updateBucket(bucketOrder));
      await bucketApi.editBucketAll(roomId, bucketId, bucketName, bucketOrder);
    } catch (e) {
      console.log(`버킷 옮기기 실패! ${e}`);
    }
  };

// 버킷이름수정
export const __updateBucketTitle = (roomId, bucketInfo) => async (dispatch) => {
  try {
    dispatch(updateBucketTitle(bucketInfo.bucketId, bucketInfo.bucketName));
    await bucketApi.editBucketTitle(roomId, bucketInfo);
  } catch (e) {}
};

// 버킷삭제
export const __deleteBucket =
  (roomId, bucketId) => async (dispatch, getState) => {
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
  } catch (e) {
    dispatch(__reqError(e));
  }
};

// 카드상세조회
export const __loadCardById = (roomId, cardId) => async (dispatch) => {
  try {
    const { data } = await cardApi.getCardById(roomId, cardId);
    dispatch(loadCardById(data));
    dispatch(loadCardByIdToCalendar(data));
  } catch (e) {
    dispatch(__reqError(e));
  }
};

// 카드생성
export const __createCard =
  (roomId, bucketId, cardTitle, initDate, initColor) =>
  async (dispatch, getState, { history }) => {
    try {
      const { data } = await cardApi.createCard(
        roomId,
        bucketId,
        cardTitle,
        initDate,
        initColor
      );

      const newCard = {
        cardId: data.cardId,
        bucketId,
        roomId,
        cardTitle,
        endDate: initDate,
        color: initColor,
      };

      const newCardOrder = getState().board.columns[bucketId].cardOrder.concat(
        newCard.cardId
      );

      dispatch(createCard(newCard, newCardOrder, bucketId));
    } catch (e) {
      dispatch(__reqError(e));
    }
  };

// 같은 버킷에서 카드 위치 수정
export const __updateCardLocate =
  (roomId, cardId, buckets) =>
  async (dispatch, getState, { history }) => {
    try {
      const curBuckets = getState().board.columns;
      const tempBucket = {};
      for (const bucket in curBuckets) {
        tempBucket[bucket] = curBuckets[bucket].cardOrder;
      }

      const paramBuckets = {
        ...tempBucket,
        [buckets.destinationBucketId]: buckets.destinationBucketOrder,
      };

      dispatch(updateCardLocate(cardId, buckets));
      await cardApi.editCardLocation(roomId, paramBuckets);
    } catch (e) {
      dispatch(__reqError(e));
    }
  };

// 다른 버킷으로 카드 위치 수정
export const __updateCardLocateOtherBucket =
  (roomId, cardId, buckets, destinationBucketId) =>
  async (dispatch, getState) => {
    try {
      const curBuckets = getState().board.columns;
      const tempBucket = {};
      for (const bucket in curBuckets) {
        tempBucket[bucket] = curBuckets[bucket].cardOrder;
      }

      const paramBuckets = {
        ...tempBucket,
        [buckets.destinationBucketId]: buckets.destinationBucketOrder,
        [buckets.sourceBucketId]: buckets.sourceBucketOrder,
      };

      dispatch(updateCardLocateOtherBucket(cardId, buckets));
      await cardApi.editCardLocation(
        roomId,
        paramBuckets,
        cardId,
        destinationBucketId
      );
    } catch (e) {
      dispatch(__reqError(e));
    }
  };

// 카드 정보 수정
export const __editCardInfos =
  (roomId, cardInfos, source) => async (dispatch) => {
    console.log(source);
    try {
      await cardApi.editCardInfo(roomId, cardInfos);
      if (source === "board") {
        dispatch(editCardInfos(cardInfos));
      } else if (source === "calendar") {
        dispatch(editSchedule(cardInfos));
      }
    } catch (e) {
      dispatch(__reqError(e));
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
      dispatch(__reqError(e));
    }
  };

/**
 * Initial State
 */
const initialState = {
  allMembers: [],
  card: {},
  cards: null,
  columns: {},
  columnOrder: [],
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
        const { newBucket } = payload;
        draft.columns[newBucket.bucketId] = newBucket;
        draft.columnOrder.unshift(newBucket.bucketId);
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

    [LOAD_CARD_BY_ID]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.card = payload.card.result;
        draft.allMembers = payload.card.allMembers;
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
        // 아래 코드 주석 후에도 정상 작동으로 보여, 일단 임시로 주석처리함 (카드 복사 버그 수정과 관련된 코드 였음)
        // if (state.cards) {
        //   // console.log(state.cards);
        //   // console.log(payload.cardId);
        //   // draft.cards[payload.cardId].bucketId = destinationBucketId;
        // }
      }),

    [UPDATE_CARD_INFOS]: (state, { payload }) =>
      produce(state, (draft) => {
        const { cardId } = payload.paramInfos;
        const newInfoKey = Object.keys(payload.paramInfos)[1];
        const newCard = { ...state.card, ...payload.paramInfos };
        draft.card = newCard;
        draft.cards[cardId][newInfoKey] = payload.paramInfos[newInfoKey];
      }),

    [DELETE_CARD]: (state, { payload }) =>
      produce(state, (draft) => {
        const { bucketId, newCardOrder, newCards } = payload;
        draft.columns[bucketId].cardOrder = newCardOrder;
        draft.cards = newCards;
      }),

    [RESET_CARD]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.card = {};
      }),

    [INIT_BOARD]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.allMembers = [];
        draft.card = {};
        draft.cards = null;
        draft.columns = {};
        draft.columnOrder = [];
      }),
  },
  initialState
);

export default board;
