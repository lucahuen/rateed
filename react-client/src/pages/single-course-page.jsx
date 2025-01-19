import { CssBaseline, Container, Typography, Box, Button, Grid } from "@mui/material";
import Header from "../components/header.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ApiContext } from "../context/api-context.jsx";
import { useTheme } from "@mui/material/styles";
import ChatBox from "../components/chat-box.jsx";
import Cookies from "js-cookie";
import Footer from "../components/footer.jsx";
import "./CSS-Files/Slider.css";

export default function SingleCoursePage() {
    const theme = useTheme();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const courseId = queryParams.get("query") || ""; // Default is an empty string
    const [course, setCourse] = useState(null);
    const { courseService, reviewService } = useContext(ApiContext);
    const [score1, setScore1] = useState(0);
    const [score2, setScore2] = useState(0);
    const [score3, setScore3] = useState(0);
    const [averageTotalScore, setAverageTotalScore] = useState(0);
    const indicatorPosition = (averageTotalScore / 5) * 100;

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
            .requestReviewsByCourse(courseId)
            .then((res) => {
                processReviews(res.data);
            })
            .catch((e) => {
                console.error(e);
            });
    }, [courseId, courseService, navigate]);

    const processReviews = (reviews) => {
        let tmpScore1 = 0;
        let tmpScore2 = 0;
        let tmpScore3 = 0;

        for (let review of reviews) {
            tmpScore1 += review.score1;
            tmpScore2 += review.score2;
            tmpScore3 += review.score3;
        }

        tmpScore1 /= reviews.length;
        tmpScore2 /= reviews.length;
        tmpScore3 /= reviews.length;

        setScore1(Number(tmpScore1.toFixed(2)));
        setScore2(Number(tmpScore2.toFixed(2)));
        setScore3(Number(tmpScore3.toFixed(2)));

        setAverageTotalScore(Number(((tmpScore1 + tmpScore2 + tmpScore3) / 3).toFixed(2)));
    };

    const formatBoolean = (value) => (value ? "Ja" : "Nein");

    return (
        <div>
            <CssBaseline />
            <Header siteInformation={`Kurs: ${course?.name}`} />
            <Container maxWidth="lg" sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {course ? (
                <Box
                    sx={{
                        p: 10,
                        mt: 1,
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                        backgroundColor: theme.palette.background.paper,
                        width: "100%",
                        display: "flex",  // Ensures flexbox layout
                        flexDirection: "column",  // Ensures content is arranged in column
                        alignItems: "center",  // Centers content horizontally
                        justifyContent: "center",
                        textAlign: "center"// Centers content vertically if needed
                    }}
                >

                <Typography variant="h2" gutterBottom sx={{textAlign: "center", justifyContent:"center", alignItems:"center"}}>
                            {course.name}
                        </Typography>

                        {/* Course Details Grid */}
                    <Grid container spacing={4} sx={{ textAlign: "center", justifyContent:"center", alignItems: "center" }}>
                        {/* Left Column */}
                            <Grid item xs={"auto"} md={6} sx={{ textAlign: "left", justifyContent:"center", alignItems: "center", backgroundColor:"blue" }}>
                                <Typography variant="h5">Semester: {course.semester}</Typography>
                                <Typography variant="h5">Professor: {course.professor}</Typography>
                                <Typography variant="h5">Lehrstuhl: {course.universityChair}</Typography>
                                <Typography variant="h5">Moodle Schlüssel: {course.moodleKey}</Typography>
                            </Grid>

                            {/* Right Column */}
                            <Grid item xs={"auto"} md={6} sx={{ textAlign: "left", alignItems: "center", backgroundColor: "green" }}>
                                <Typography variant="h5">Klausurzulassung: {formatBoolean(course.examAdmission)}</Typography>
                                <Typography variant="h5">Übung: {formatBoolean(course.tutorial)}</Typography>
                                <Typography variant="h5">Alt Klausuren: {formatBoolean(course.oldExam)}</Typography>
                                <Typography variant="h5">Bonus Punkte: {formatBoolean(course.bonusPoints)}</Typography>
                            </Grid>
                        </Grid>

                        {/* Slider Section */}
                        <div className="slider-container">
                            <div className="slider-label">Overall Rating</div>
                            <div className="slider-bar">
                                <div
                                    className="rating-indicator"
                                    style={{ left: `${indicatorPosition}%` }}
                                ></div>
                            </div>
                            <div className="slider-value">Value: {averageTotalScore.toFixed(2)}</div>
                        </div>

                        {/* Scores Display */}
                        <Typography variant="body1">Score 1: {score1}</Typography>
                        <Typography variant="body1">Score 2: {score2}</Typography>
                        <Typography variant="body1">Score 3: {score3}</Typography>
                    </Box>
                ) : (
                    <Typography variant="body1" color="textSecondary">
                        Kursdaten werden geladen...
                    </Typography>
                )}
            </Container>
            <Container maxWidth="md" sx={{ mt: 4 }} style={{ textAlign: "center" }}>
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
            </Container>
            <ChatBox />
            <Footer />
        </div>
    );
}
