import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import Routes instead of Switch
import { ApiProvider } from "./context/api-context";
import TodoList from "./pages/todo-list.jsx";
import CourseList from "./pages/course-list.jsx";

function App() {
    return (
        <ApiProvider>
            <Router>
                <Routes> {/* Use Routes instead of Switch */}
                    <Route path="/todos" element={<TodoList />} />
                    <Route path="/courses" element={<CourseList />} />
                    {/* You can add a default or home route */}
                    <Route path="/" element={<div>Welcome to the app!</div>} />
                </Routes>
            </Router>
        </ApiProvider>
    );
}

export default App;
