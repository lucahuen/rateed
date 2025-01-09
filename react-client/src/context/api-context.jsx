import React, {createContext} from "react";
import TodoService from "../services/todo-service";
import CourseService from "../services/course-service";
import RegisterService from "../services/register-service.js";

const ApiContext = createContext(null);

const ApiProvider = ({children}) => {
    const todoService = new TodoService();
    const courseService = new CourseService();
    const registerService = new RegisterService()

    return (
        <ApiContext.Provider value={{
            todoService,
            courseService,
            registerService
        }}>
            {children}
        </ApiContext.Provider>
    );
};

export {ApiProvider, ApiContext};
