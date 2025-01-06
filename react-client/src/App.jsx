import React from "react";
import { ApiProvider } from "./context/api-context";
import TodoList from "./pages/todo-list";

function App() {
  return (
    <ApiProvider>
      <TodoList />
    </ApiProvider>
  );
}

export default App;
