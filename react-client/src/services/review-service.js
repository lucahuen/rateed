import api from "../utils/backend";

export default class ReviewService {

    requestSubmitRating = async (userId, score1, score2, score3, courseId) => {
        try {
            const response = await api.post("/api/reviews",
                {userId: userId, score1: score1, score2: score2, score3: score3, courseId: courseId});
            return response.data;
        } catch (e) {
            throw e.response.data.error.message;
        }
    }

}