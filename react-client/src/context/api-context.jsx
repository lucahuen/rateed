import React, {createContext} from "react";
import TodoService from "../services/todo-service";
import CourseService from "../services/course-service";
import UserService from "../services/user-service.js";
import ChatService from "../services/chat-service.js";
import ReviewService from "../services/review-service.js";

const ApiContext = createContext(null);

const ApiProvider = ({children}) => {
    const todoService = new TodoService();
    const courseService = new CourseService();
    const userService = new UserService();
    const chatService = new ChatService();
    const reviewService = new ReviewService();

    return (
        <ApiContext.Provider value={{
            todoService,
            courseService,
            userService,
            chatService,
            reviewService,
        }}>
            {children}
        </ApiContext.Provider>
    );
};

export {ApiProvider, ApiContext};
