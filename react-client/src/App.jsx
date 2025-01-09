import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import TodoList from './pages/todo-list';
import LoginPage from './pages/login-page';
import CourseList from './pages/course-list';
import Header from './components/header';
import {ApiProvider} from './context/api-context';

function App() {
    return (
        <ApiProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Header siteInformation={"Startseite"}/>}/>
                    <Route path="/todos" element={<TodoList/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/courses" element={<CourseList/>}/>
                    <Route path="*" element={<h1>404 - Seite nicht gefunden</h1>}/>
                </Routes>
            </Router>
        </ApiProvider>
    );
}

export default App;
