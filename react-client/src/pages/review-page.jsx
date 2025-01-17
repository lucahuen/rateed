import React, {useContext, useEffect, useState} from "react";
import Header from "../components/header";
import Footer from "../components/footer.jsx";
import {Box, CssBaseline, Button} from "@mui/material";
import Cookies from "js-cookie";
import {useLocation, useNavigate} from "react-router-dom";
import {ApiContext} from "../context/api-context.jsx";
import QuestionBox from "../components/questionBox.jsx";

export default function ReviewPage() {
    const sessionId = Cookies.get("auth");
    const navigate = useNavigate();
    const {courseService, reviewService} = useContext(ApiContext);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const courseId = queryParams.get("query") || "";

    const [course, setCourse] = useState("");

    // INITIAL STATE OF THESE MUST BE THE EXACT SAME AS IN @QUESTION-BOX
    const [question1, setQuestion1] = useState(5);
    const [question2, setQuestion2] = useState(5);
    const [question3, setQuestion3] = useState(5);


    useEffect(() => {
        courseService
            .requestCourseById(courseId)
            .then((res) => {
                setCourse(res.data);
            })
            .catch((error) => {
                console.error("[Error]: " + error);
            });
    }, [courseId]);


    const handleRatingChange1 = (value) => {
        setQuestion1(value)
    };

    const handleRatingChange2 = (value) => {
        setQuestion2(value)
    };

    const handleRatingChange3 = (value) => {
        setQuestion3(value)
    };

    const handleSubmitRatings = (score1, score2, score3) => {
        try {
            reviewService.requestSubmitRating(sessionId, score1, score2, score3, courseId).then(() => {
                console.log("Success");
                //navigate("/reviews");
            }).catch((error) => {
                console.error("Error", error);
            })

        } catch (error) {
            console.error("Fehler beim Senden der Nachricht:", error);
        }

    };


    return (
        <div style={{
            textAlign: "center",
            fontFamily: "Arial, Helvetica, sans-serif",
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
        }}>
            <CssBaseline/>
            <Header siteInformation={`Review erstellen zu ${course?.name}`}/>

            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-start', // Beginnt am oberen Rand
                    gap: 2,
                    padding: 2,
                    marginTop: 10,
                    overflowY: 'auto', // Ermöglicht das Scrollen der QuestionBox-Komponenten
                    maxHeight: 'calc(100vh - 150px)', // Verhindert, dass der Container den Viewport überschreitet
                }}
            >

                <QuestionBox
                    text={`Frage 1: `}
                    onRatingChange={handleRatingChange1}
                />

                <QuestionBox
                    text={`Frage 2: `}
                    onRatingChange={handleRatingChange2}
                />

                <QuestionBox
                    text={`Frage 3: `}
                    onRatingChange={handleRatingChange3}
                />

            </Box>


            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 3, // Größerer Abstand zwischen den Buttons
                    paddingBottom: 2,
                }}
            >
                <Button
                    variant="contained"
                    color="error" // Rot eingefärbt
                    sx={{
                        px: 4,
                        py: 2,
                        fontSize: "1rem",
                        textTransform: "none",
                        borderRadius: "8px",
                    }}
                    onClick={() => navigate(`/courses/course?query=${encodeURIComponent(courseId)}`)}
                >
                    Abbrechen
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{
                        px: 4,
                        py: 2,
                        fontSize: "1rem",
                        textTransform: "none",
                        borderRadius: "8px",
                    }}
                    onClick={() => handleSubmitRatings(question1, question2, question3)}
                >
                    Bewertungen abschicken
                </Button>
            </Box>
            <Footer/>
        </div>
    );
}