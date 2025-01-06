import api from "../utils/backend";

export default class TodoService {
  requestAllTodos = async () => {
    try {
      const response = await api.get("/todos");
      return response.data;
    } catch (error) {
      throw error.response.data.error.message;
    }
  };

  requestCreateTodo = async (title) => {
    try {
      const response = await api.post("/todos/create", { title });
      return response.data;
    } catch (error) {
      throw error.response.data.error.message;
    }
  };

  requestDeleteTodo = async (todoId) => {
    try {
      const response = await api.delete(`/todos/${todoId}`);
      return response.data;
    } catch (error) {
      throw error.response.data.error.message;
    }
  };
}
