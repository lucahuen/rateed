import React, { useContext, useEffect, useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer.jsx";
import { Box, CssBaseline, Button } from "@mui/material";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import { ApiContext } from "../context/api-context.jsx";
import QuestionBox from "../components/questionBox.jsx";

export default function ReviewPage() {
    const sessionId = Cookies.get("auth");
    const navigate = useNavigate();
    const { courseService, reviewService } = useContext(ApiContext);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const courseId = queryParams.get("courseId") || "";

    const [course, setCourse] = useState("");
    const [ratings, setRatings] = useState([3]);

    const [question1, setQuestion1] = useState(0);
    const [question2, setQuestion2] = useState(0);
    const [question3, setQuestion3] = useState(0);




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

    const handleSubmitRatings = (username, score1, score2, score3, courseName) => {
        try {
            reviewService.requestSubmitRating(username, score1, score2, score3, courseName).then(() =>{
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
        <CssBaseline />
        <Header siteInformation={`Review erstellen zu ${course?.name}`} />

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


        <Box sx={{ paddingBottom: 2 }}>
            <Button
                variant="contained"
                color="primary"
                onClick={handleSubmitRatings}
            >
                Bewertungen abschicken
            </Button>
        </Box>

        {/* Footer bleibt am Ende */}
        <Footer />
    </div>
);
}