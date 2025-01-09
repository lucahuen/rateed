import api from "../utils/backend.js";

export default class TodoService {
    requestAllTodos = async () => {
        try {
            const response = await api.get("/api/todos");
            return response.data;
        } catch (error) {
            throw error.response.data.error.message;
        }
    };

    requestCreateTodo = async (title) => {
        try {
            const response = await api.post("/api/todos/create", {title});
            return response.data;
        } catch (error) {
            throw error.response.data.error.message;
        }
    };

    requestDeleteTodo = async (todoId) => {
        try {
            const response = await api.delete(`/api/todos/${todoId}`);
            return response.data;
        } catch (error) {
            throw error.response.data.error.message;
        }
    };
}
