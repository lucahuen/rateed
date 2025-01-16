import api from "../utils/backend";

export default class ChatService {
    requestMessages = async () => {
        try {
            const response = await api.get(`/api/messages`);
            return response.data
        } catch (error) {
            throw error.response.data.error.message;
        }
    }

    requestMessagesOfCourse = async (courseId) => {
        try {
            const response = await api.get(`/api/messages/course/${courseId}`);
            return response.data
        } catch (error) {
            throw error.response.data.error.message;
        }
    }

    requestSendMessage = async (username, text, courseId) => {
        try {
            const response = await api.post("/api/messages",
                {username: username, text: text, courseId: courseId});
            return response.data;
        } catch (error) {
            throw error.response.data.error.message;
        }
    }

    requestDeleteMessage = async (id) => {
        try {
            const response = await api.delete(`/api/messages/${id}`)
            return response.data
        }catch (error){
            throw error.response.data.error.message;
        }
    }
}