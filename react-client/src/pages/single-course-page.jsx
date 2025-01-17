import { CssBaseline, Container, Typography, Box } from "@mui/material";
import Header from "../components/header.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ApiContext } from "../context/api-context.jsx";
import { useTheme } from "@mui/material/styles";
import ChatBox from "../components/chat-box.jsx";
import Cookies from "js-cookie";

export default function SingleCoursePage() {
    const theme = useTheme();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const courseId = queryParams.get("query") || ""; // Default ist ein leerer String
    const [course, setCourse] = useState(null);
    const { courseService } = useContext(ApiContext);

    const sessionId = Cookies.get("auth");
    const navigate = useNavigate();

    useEffect(() => {
        if (!courseId) {
            navigate("/courses");
        }
        if (!sessionId) {
            navigate("/");
        }
        courseService
            .requestCourseById(courseId)
            .then((res) => {
                setCourse(res.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [courseId, courseService, navigate]);

    const formatBoolean = (value) => (value ? "Ja" : "Nein");

    return (
        <div>
            <CssBaseline />
            <Header siteInformation={`Kurs: ${course?.name}`} />
            <Container maxWidth="md" sx={{ mt: 4 }}>
                {course ? (
                    <Box
                        sx={{
                            p: 10,
                            border: "1px solid #ddd",
                            borderRadius: "8px",
                            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                            backgroundColor: theme.palette.background.paper,
                        }}
                    >
                        <Typography variant="h2" gutterBottom>
                            {course.name}
                        </Typography>
                        <Typography variant="h5" sx={{ mb: 2 }}>
                            Semester: {course.semester}
                        </Typography>
                        <Typography variant="h5" sx={{ mb: 2 }}>
                            Professor: {course.professor}
                        </Typography>
                        <Typography variant="h5" sx={{ mb: 2 }}>
                            University Chair: {course.university_chair}
                        </Typography>
                        <Typography variant="h5" sx={{ mb: 2 }}>
                            Score: {course.score}
                        </Typography>
                        <Typography variant="h5" sx={{ mb: 2 }}>
                            Counter: {course.counter}
                        </Typography>
                        <Typography variant="h5" sx={{ mb: 2 }}>
                            Bonus Points: {formatBoolean(course.bonus_points)}
                        </Typography>
                        <Typography variant="h5" sx={{ mb: 2 }}>
                            Exam Date:{" "}
                            {course.exam_date
                                ? new Date(course.exam_date).toLocaleDateString()
                                : "Noch nicht festgelegt"}
                        </Typography>
                        <Typography variant="h5" sx={{ mb: 2 }}>
                            Exam Admission: {formatBoolean(course.exam_admission)}
                        </Typography>
                        <Typography variant="h5" sx={{ mb: 2 }}>
                            Old Exam: {formatBoolean(course.old_exam)}
                        </Typography>
                        <Typography variant="h5" sx={{ mb: 2 }}>
                            Tutorial: {formatBoolean(course.tutorial)}
                        </Typography>
                        <Typography variant="h5" sx={{ mb: 2 }}>
                            Author ID: {course.author_id || "Nicht zugewiesen"}
                        </Typography>
                        <Typography variant="h5" sx={{ mb: 2 }}>
                            Erstellt am:{" "}
                            {new Date(course.createdAt).toLocaleDateString()}
                        </Typography>
                    </Box>
                ) : (
                    <Typography variant="body1" color="textSecondary">
                        Kursdaten werden geladen...
                    </Typography>
                )}
            </Container>
            <ChatBox />
        </div>
    );
}
