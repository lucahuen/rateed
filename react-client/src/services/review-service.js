import api from "../utils/backend";

export default class ReviewService {

    requestSubmitRating = async (username, score1, score2, score3, courseName) => {
        try {
            const response = await api.post("/api/reviews",
                {username:username, score1:score1, score2:score2, score3:score3, courseName:courseName},);

            return response.data;
        } catch (e){
            throw e.response.data.error.message;
        }
    }

}