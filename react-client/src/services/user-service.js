import api from "../utils/backend.js";

export default class UserService {
    requestRegister = async (username, password) => {
        try{
            const response = await api.post("/api/users/create", {username, password});
            return response.data;
        }catch (error){
            throw error.response.data.error.message
        }
    }
}