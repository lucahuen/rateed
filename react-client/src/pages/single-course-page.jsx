import { CssBaseline, Container, Typography, Box } from "@mui/material";
import Header from "../components/header.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ApiContext } from "../context/api-context.jsx";

export default function SingleCoursePage() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const courseId = queryParams.get("query") || ""; // Default ist ein leerer String
    const [course, setCourse] = useState(null);
    const { courseService } = useContext(ApiContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (!courseId) {
            navigate("/courses");
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

    return (
        <div>
            <CssBaseline />
            <Header siteInformation={`Kurs mit id: ${courseId}`} />
            <Container maxWidth="md" sx={{ mt: 4 }}>
                {course ? (
                    <Box
                        sx={{
                            p: 4,
                            border: "1px solid #ddd",
                            borderRadius: "8px",
                            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                            backgroundColor: "#f9f9f9",
                        }}
                    >
                        <Typography variant="h4" gutterBottom>
                            {course.name}
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                            Semester: {course.semester}
                        </Typography>
                    </Box>
                ) : (
                    <Typography variant="body1" color="textSecondary">
                        Kursdaten werden geladen...
                    </Typography>
                )}
            </Container>
        </div>
    );
}
