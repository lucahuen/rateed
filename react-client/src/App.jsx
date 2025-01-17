import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LoginRegisterPage from './pages/login-register-page.jsx';
import CourseList from './pages/course-list';
import {ApiProvider} from './context/api-context';
import ProfilePage from "./pages/profile-page.jsx";
import LandingPage from "./pages/landing-page.jsx";
import SingleCoursePage from "./pages/single-course-page.jsx";
import AddCoursePage from "./pages/add-course-page.jsx";
import {ThemeProvider} from "@mui/material";
import theme from "./theme";
import ReviewPage from "./pages/review-page.jsx";

function App() {
    return (
        <ApiProvider>
            <ThemeProvider theme={theme}>
                <Router>
                    <Routes>
                        <Route path="/" element={<LandingPage/>}/>

                        {/*LOGIN AND REGISTER*/}
                        <Route path="/login" element={<LoginRegisterPage/>}/>

                        {/*PROFILE*/}
                        <Route path={"/profile"} element={<ProfilePage/>}/>

                        {/*COURSES*/}
                        <Route path="/courses" element={<CourseList/>}/>
                        <Route path="/courses/course" element={<SingleCoursePage/>}/>
                        <Route path="/courses/add" element={<AddCoursePage/>}/>

                        {/*REVIEW*/}
                        <Route path="/review" element={<ReviewPage/>}/>

                        {/*404*/}
                        <Route path="*" element={<h1>404 - Seite nicht gefunden</h1>}/>
                    </Routes>
                </Router>
            </ThemeProvider>
        </ApiProvider>
    );
}

export default App;
