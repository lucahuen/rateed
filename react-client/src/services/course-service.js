import api from "../utils/backend";

export default class CourseService {
    requestAllCourses = async () => {
        try {
            const response = await api.get("/api/courses");
            return response.data;
        } catch (error) {
            throw error.response.data.error.message;
        }
    };

    requestCreateCourse = async (name, semester) => {
        try {
            const response = await api.post("/api/courses/create", {name, semester});
            return response.data;
        } catch (error) {
            throw error.response.data.error.message;
        }
    };

    requestDeleteCourse = async (courseId) => {
        try {
            const response = await api.delete(`/api/courses/${courseId}`);
            return response.data;
        } catch (error) {
            throw error.response.data.error.message;
        }
    };

    requestCourseByName = async (name) => {
        try {
            const response = await api.get(`/api/courses/${name}`);
            return response.data;
        } catch (error) {
            throw error.response.data.error.message;
        }
    };

    requestCoursesByQueryName = async (query) => {
        try {
            if (query) {
                const response = await api.get(`api/courses/q/${query}`);
                return response.data;
            }else {
                return this.requestAllCourses();
            }
        } catch (error) {
            throw error.response.data.message;
        }
    }
}