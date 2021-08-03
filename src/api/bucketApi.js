import { instance } from "./index";

export const bucketApi = {
  getBuckets: () => instance.get(),
  editBucketAll: () => instance.patch(),
  deleteBucket: () => instance.delete(),
  createBucket: () => instance.post(),
};
