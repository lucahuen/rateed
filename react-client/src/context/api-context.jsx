import React, {createContext} from "react";
import TodoService from "../services/todo-service";
import CourseService from "../services/course-service";
import UserService from "../services/user-service.js";

const ApiContext = createContext(null);

const ApiProvider = ({children}) => {
    const todoService = new TodoService();
    const courseService = new CourseService();
    const userService = new UserService();

    return (
        <ApiContext.Provider value={{
            todoService,
            courseService,
            userService,
        }}>
            {children}
        </ApiContext.Provider>
    );
};

export {ApiProvider, ApiContext};
