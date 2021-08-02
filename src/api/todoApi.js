import { instance } from "./index";

export const todoApi = {
  createTodo: () => instance.post(),
  editTodo: () => instance.patch(),
  deleteTodo: () => instance.delete(),
};
