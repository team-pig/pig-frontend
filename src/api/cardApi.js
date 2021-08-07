import { instance } from "./index";

export const cardApi = {
  createCard: (roomId, bucketId, cardTitle) =>
    instance.post(`/room/${roomId}/card`, { bucketId, cardTitle }),

  getCards: (roomId) => instance.get(`/room/${roomId}`),

  getCardById: (roomId, cardId) =>
    instance.get(`/room/${roomId}/card/${cardId}`),

  editCardLocation: (roomId, newBucketInfo) =>
    instance.patch(`/room/${roomId}/cardLocation`, {
      cardOrder: newBucketInfo,
    }),

  editCardInfo: (roomId, cardInfos) =>
    instance.patch(`/room/${roomId}/card`, cardInfos),

  deleteCard: (bucketId, cardId, roomId) =>
    instance.delete(`/room/${roomId}/card`, {
      data: {
        cardId,
      },
    }),
};
