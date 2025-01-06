import React, { createContext } from "react";
import TodoService from "../services/todo-service";

const ApiContext = createContext(null);

const ApiProvider = ({ children }) => {
  const todoService = new TodoService();

  return (
    <ApiContext.Provider value={{ todoService }}>
      {children}
    </ApiContext.Provider>
  );
};

export { ApiProvider, ApiContext };
