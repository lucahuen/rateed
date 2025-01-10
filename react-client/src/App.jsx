import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import TodoList from './pages/todo-list';
import LoginPage from './pages/login-page';
import CourseList from './pages/course-list';
import Header from './components/header';
import {ApiProvider} from './context/api-context';
import RegisterPage from "./pages/register-page.jsx";
import ProfilePage from "./pages/profile-page.jsx";
import LandingPage from "./pages/landing-page.jsx";

function App() {
    return (
        <ApiProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<LandingPage/>}/>
                    <Route path="/todos" element={<TodoList/>}/>

                    {/*LOGIN AND REGISTER*/}
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>

                    {/*PROFILE*/}
                    <Route path={"/profile"} element={<ProfilePage/>}/>

                    <Route path="/courses" element={<CourseList/>}/>
                    <Route path="*" element={<h1>404 - Seite nicht gefunden</h1>}/>
                </Routes>
            </Router>
        </ApiProvider>
    );
}

export default App;
