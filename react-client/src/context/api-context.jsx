import React, {createContext} from "react";
import TodoService from "../services/todo-service";
import CourseService from "../services/course-service";

const ApiContext = createContext(null);

const ApiProvider = ({children}) => {
    const todoService = new TodoService();
    const courseService = new CourseService();

    return (
        <ApiContext.Provider value={{todoService, courseService}}>
            {children}
        </ApiContext.Provider>
    );
};

export {ApiProvider, ApiContext};
