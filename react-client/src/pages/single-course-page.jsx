import { CssBaseline, Container, Typography, Box, Button, Grid } from "@mui/material";
import Header from "../components/header.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ApiContext } from "../context/api-context.jsx";
import { useTheme } from "@mui/material/styles";
import ChatBox from "../components/chat-box.jsx";
import Cookies from "js-cookie";
import Footer from "../components/footer.jsx";
import "./CSS-Files/BigSlider.css";
import "./CSS-Files/SmallSlider.css";

export default function SingleCoursePage() {
    const theme = useTheme();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const courseId = queryParams.get("query") || ""; // Default is an empty string
    const [course, setCourse] = useState(null);
    const { courseService, reviewService } = useContext(ApiContext);
    const [scoreTime, setScoreTime] = useState(0);
    const [scoreComplexity, setScoreComplexity] = useState(0);
    const [scoreQuality, setScoreQuality] = useState(0);
    const [averageTotalScore, setAverageTotalScore] = useState(0);
    const indicatorPositionTotal = (averageTotalScore / 5) * 100;
    const indicatorPositionQuality = (scoreQuality / 5) * 100;
    const indicatorPositionComplexity = (scoreComplexity / 5) * 100;
    const indicatorPositionTime = (scoreTime/ 5) * 100;


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
        let tmpScoreTime = 0;
        let tmpScoreComplexity = 0;
        let tmpScoreQuality = 0;

        for (let review of reviews) {
            tmpScoreTime += review.score1;
            tmpScoreComplexity+= review.score2;
            tmpScoreQuality += review.score3;
        }

        tmpScoreTime /= reviews.length;
        tmpScoreComplexity /= reviews.length;
        tmpScoreQuality /= reviews.length;

        setScoreTime(Number(tmpScoreTime.toFixed(2)));
        setScoreComplexity(Number(tmpScoreComplexity.toFixed(2)));
        setScoreQuality(Number(tmpScoreQuality.toFixed(2)));

        setAverageTotalScore(Number(((tmpScoreTime + tmpScoreComplexity + tmpScoreQuality) / 3).toFixed(2)));
    };

    const formatBoolean = (value) => (value ? "Ja" : "Nein");

    return (
        <div>
            <CssBaseline />
            <Header siteInformation={`Kurs: ${course?.name}`} />
            <Container maxWidth="lg" sx={{ mt: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent:"center" }}>
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

                    <Typography variant="h2" gutterBottom
                                sx={{textAlign: "center", justifyContent: "center", alignItems: "center"}}>
                        {course.name}
                    </Typography>

                    {/* Course Details Grid */}
                    <Grid container sx={{textAlign: "center", justifyContent: "center", alignItems: "center"}}>
                        {/* Left Column */}
                        <Grid item xs={12} md={6} sx={{textAlign: "left"}}>
                            <Typography variant="h5">Semester: {course.semester}</Typography>
                            <Typography variant="h5">Professor: {course.professor}</Typography>
                            <Typography variant="h5">Lehrstuhl: {course.universityChair}</Typography>
                            <Typography variant="h5">Moodle Schlüssel: {course.moodleKey}</Typography>
                        </Grid>

                        {/* Right Column */}
                        <Grid item xs={12} md={6} sx={{textAlign: "left"}}>
                            <Typography
                                variant="h5">Klausurzulassung: {formatBoolean(course.examAdmission)}</Typography>
                            <Typography variant="h5">Übung: {formatBoolean(course.tutorial)}</Typography>
                            <Typography variant="h5">Alt Klausuren: {formatBoolean(course.oldExam)}</Typography>
                            <Typography variant="h5">Bonus Punkte: {formatBoolean(course.bonusPoints)}</Typography>
                        </Grid>
                    </Grid>

                    {/* Slider Section */}
                    <div className="bigslider-container">
                        <div className="bigslider-label">Gesamtbewertung</div>
                        <div className="bigslider-bar">
                            <div
                                className="bigrating-indicator"
                                style={{left: `${indicatorPositionTotal}%`}}
                            ></div>
                        </div>
                        <div className="bigslider-value">Value: {averageTotalScore.toFixed(2)}</div>
                    </div>

                    {/* Individual Scores Slider Display */}
                    <div className="smallslider-container">
                        <div className="smallslider-label">Zeitaufwand (relativ zu CP)</div>
                        <div className="smallslider-bar">
                            <div
                                className="smallrating-indicator"
                                style={{left: `${indicatorPositionTime}%`}}
                            ></div>
                        </div>
                        <div className="smallslider-value">Wert: {scoreTime.toFixed(2)}</div>
                    </div>

                    <div className="smallslider-container">
                        <div className="smallslider-label">Komplexität</div>
                        <div className="smallslider-bar">
                            <div
                                className="smallrating-indicator"
                                style={{left: `${indicatorPositionComplexity}%`}}
                            ></div>
                        </div>
                        <div className="smallslider-value">Wert: {scoreComplexity.toFixed(2)}</div>
                    </div>

                    <div className="smallslider-container">
                        <div className="smallslider-label">Vorlesungsqualität</div>
                        <div className="smallslider-bar">
                            <div
                                className="smallrating-indicator"
                                style={{left: `${indicatorPositionQuality}%`}}
                            ></div>
                        </div>
                        <div className="smallslider-value">Wert: {scoreQuality.toFixed(2)}</div>
                    </div>
                </Box>
            ) : (
                <Typography variant="body1" color="textSecondary">
                    Kursdaten werden geladen...
                </Typography>
            )}
            </Container>
            <Container maxWidth="md" sx={{mt: 4}} style={{textAlign: "center"}}>
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
