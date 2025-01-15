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

    requestSendMessage = async (username, text) => {
        try {
            const response = await api.post("/api/messages",
                {username: username, text: text});
            return response.data;
        } catch (error) {
            throw error.response.data.error.message;
        }
    }
}