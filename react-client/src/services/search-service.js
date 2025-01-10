import api from "../utils/backend.js";

export default class SearchService {
    requestSearchResults = async (query) => {
        try {
            const response = await api.get("/api/search", { params: { q: query } });
            return response.data;
        } catch (error) {
            throw error.response.data.error.message;
        }
    };
}