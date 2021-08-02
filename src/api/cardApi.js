import { instance } from "./index";

export const cardApi = {
  getCards: () => instance.get(),
  getCardById: () => instance.get(),
  editCardContents: () => instance.patch(),
  editCardLocation: () => instance.patch(),
  deleteCard: () => instance.delete(),
  createCard: () => instance.post(),
};
