import {CssBaseline, Container, Typography, Box, Button} from "@mui/material";
import Header from "../components/header.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {ApiContext} from "../context/api-context.jsx";
import {useTheme} from "@mui/material/styles";
import ChatBox from "../components/chat-box.jsx";
import Cookies from "js-cookie";
import Footer from "../components/footer.jsx";

export default function SingleCoursePage() {
    const theme = useTheme();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const courseId = queryParams.get("query") || ""; // Default ist ein leerer String
    const [course, setCourse] = useState(null);
    const {courseService, reviewService} = useContext(ApiContext);
    const [userHasReviewedThisCourse, setUserHasReviewedThisCourse] = useState(false);

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
        reviewService
            .requestReviewByUserAndCourse(sessionId, courseId)
            .then((res) => {
                console.log(res.data)
                if (res.data) {
                    setUserHasReviewedThisCourse(true);
                } else {
                    setUserHasReviewedThisCourse(false);
                }
            })
            .catch((e) => {
                console.error(e)
            })
    }, [courseId, courseService, navigate]);

    const formatBoolean = (value) => (value ? "Ja" : "Nein");

    return (
        <div>
            <CssBaseline/>
            <Header siteInformation={`Kurs: ${course?.name}`}/>
            <Container maxWidth="md" sx={{mt: 4}}>
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
                        <Typography variant="h5" sx={{mb: 2}}>
                            Semester: {course.semester}
                        </Typography>
                        <Typography variant="h5" sx={{mb: 2}}>
                            Professor: {course.professor}
                        </Typography>
                        <Typography variant="h5" sx={{mb: 2}}>
                            University Chair: {course.universityChair}
                        </Typography>
                        <Typography variant="h5" sx={{mb: 2}}>
                            Exam Date:{" "}
                            {course.exam_date
                                ? new Date(course.exam_date).toLocaleDateString()
                                : "Noch nicht festgelegt"}
                        </Typography>
                        <Typography variant="h5" sx={{mb: 2}}>
                            Exam Admission: {formatBoolean(course.examAdmission)}
                        </Typography>
                        <Typography variant="h5" sx={{mb: 2}}>
                            Tutorial: {formatBoolean(course.tutorial)}
                        </Typography>
                        <Typography variant="h5" sx={{mb: 2}}>
                            Old Exam: {formatBoolean(course.oldExam)}
                        </Typography>
                        <Typography variant="h5" sx={{mb: 2}}>
                            Bonus Points: {formatBoolean(course.bonusPoints)}
                        </Typography>
                    </Box>
                ) : (
                    <Typography variant="body1" color="textSecondary">
                        Kursdaten werden geladen...
                    </Typography>
                )}
            </Container>
            <Container maxWidth="md" sx={{mt: 4}} style={{textAlign: "center"}}>
                {!userHasReviewedThisCourse && (
                    <Button
                        style={{
                            fontSize: "1.2rem",
                            padding: "12px 30px",
                            backgroundColor: theme.palette.primary.main,
                            color: "#fff",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                            transition: "all 0.3s ease",
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        }}
                        onMouseOver={(e) => {
                            e.target.style.backgroundColor = theme.palette.primary.dark;
                            e.target.style.boxShadow = "0 6px 10px rgba(0, 0, 0, 0.2)";
                        }}
                        onMouseOut={(e) => {
                            e.target.style.backgroundColor = theme.palette.primary.main;
                            e.target.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
                        }}
                        onClick={() => navigate(`/review?query=${encodeURIComponent(courseId)}`)}
                    >
                        Bewerte diesen Kurs
                    </Button>
                )}
            </Container>
            v
            <ChatBox/>
            <Footer/>
        </div>
    );
}
