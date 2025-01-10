import api from "../utils/backend.js";

export default class UserService {
    requestRegister = async (username, password) => {
        try {
            const response = await api.post("/api/users/create", {username, password});
            return response.data;
        } catch (error) {
            throw error.response.data.error.message
        }
    }
    requestLogin = async (username, password) => {
        try {
            const response = await api.post("/api/users/login", {username, password})
            return response.data
        } catch (error) {
            throw error.response.data.error.message
        }
    }
    requestUserById = async (id) => {
        try {
            const response = await api.get(`/api/users/${id}`)
            return response.data
        } catch (error) {
            throw error.response.data.error.message
        }
    }
    requestUpdatePassword = async (id, currentPassword, newPassword) => {
        try {
            const response = await api.post(`/api/users/${id}/updatePassword`,
                {
                    currentPassword: currentPassword,
                    newPassword: newPassword
                })
            return response.data
        } catch (error) {
            throw error.response.data.error.message
        }
    }
}