import { instance } from "./index";

export const docApi = {
  getDocs: (roomId) => instance.get(`room/${roomId}/documents`),
  createDoc: (roomId, docObj) =>
    instance.post(`/room/${roomId}/document`, docObj),
  editDoc: (roomId, docObj) => instance.put(`/room/${roomId}/document`, docObj),
  deleteDoc: (roomId, documentId) =>
    instance.delete(`/room/${roomId}/document`, {
      data: {
        documentId,
      },
    }),
};
