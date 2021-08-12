import { instance } from "./index";

export const bucketApi = {
  getBuckets: (roomId) => instance.get(`/room/${roomId}/bucket`),
  editBucketAll: (roomId, bucketId, bucketName, bucketOrder) =>
    instance.patch(`/room/${roomId}/bucket`, {
      bucketId,
      bucketName,
      bucketOrder,
    }),
  editBucketTitle: (roomId, bucketInfo) =>
    instance.patch(`/room/${roomId}/bucket`, bucketInfo),
  deleteBucket: (roomId, bucketId) =>
    instance.delete(`/room/${roomId}/bucket`, {
      data: {
        bucketId,
      },
    }),
  createBucket: (roomId, bucketName) =>
    instance.post(`/room/${roomId}/bucket`, { bucketName }),
};
