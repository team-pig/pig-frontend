import { instance } from "./index";

export const todoApi = {
  getTodo: (roomId, cardId) => instance.get(`/room/${roomId}/todo/${cardId}`),
  createTodo: (roomId, todoInfo) =>
    instance.post(`room/${roomId}/todo`, todoInfo),

  editTodoTtitle: (roomId, todoId, todoTitle) =>
    instance.patch(`room/${roomId}/todo`, { todoId, todoTitle }),

  checkedTodo: (roomId, todoId, isChecked) =>
    instance.patch(`room/${roomId}/todo`, { todoId, isChecked }),

  addMember: (roomId, todoId, addMember) =>
    instance.patch(`room/${roomId}/todo`, {
      todoId,
      addMember,
    }),

  removeMember: (roomId, todoId, removeMember) =>
    instance.patch(`room/${roomId}/todo`, {
      todoId,
      removeMember,
    }),

  deleteTodo: (roomId, todoId) =>
    instance.delete(`room/${roomId}/todo`, { data: { todoId } }),

  loadMyTodo: (roomid) => instance.get(`/room/${roomid}/main/todos`),
};
