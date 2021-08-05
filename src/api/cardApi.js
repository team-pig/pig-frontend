import { instance } from "./index";

export const cardApi = {
  createCard: (roomId, bucketId, cardTitle) =>
    instance.post(`/room/${roomId}/card`, { bucketId, cardTitle }),

  getCards: (roomId) => instance.get(`/room/${roomId}`),

  getCardById: (roomId, cardId) =>
    instance.get(`/room/${roomId}/card/${cardId}`),
  // editCardContents: (roomId) => instance.patch(`/room/${roomId}/card`, {}),

  editCardLocation: (roomId, cardId, newBucketInfo) =>
    instance.patch(`/room/${roomId}/cardLocation`, {
      cardId,
      sourceBucket: newBucketInfo.sourceBucketId,
      sourceBucketOrder: newBucketInfo.sourceBucketOrder,
      destinationBucket: newBucketInfo.destinationBucketId,
      destinationBucketOrder: newBucketInfo.destinationBucketOrder,
    }),

  deleteCard: (bucketId, cardId, roomId) =>
    instance.delete(`/room/${roomId}/card`, {
      data: {
        cardId,
      },
    }),
};
