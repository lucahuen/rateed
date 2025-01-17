import React, { useContext, useEffect, useState } from "react";
import { CssBaseline, Typography, Divider, Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import Header from "../components/header";
import AddCourse from "../components/add-course";
import Footer from "../components/footer";
import { ApiContext } from "../context/api-context";
import { useLocation, useNavigate } from "react-router-dom";

export default function AddCoursePage() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    let initialQuery = queryParams.get("query") || ""; // Default ist ein leerer String

    const [courses, setCourses] = useState([]);

    const { courseService } = useContext(ApiContext);
    const navigate = useNavigate();

    useEffect(() => {
        // Führe Suche aus, wenn ein Query-Parameter vorhanden ist
        courseService
            .requestCoursesByQueryName(initialQuery)
            .then((res) => {
                setCourses(res.data);
                initialQuery = "";
            })
            .catch((error) => {
                console.error("[Error]: " + error);
            });
    }, [initialQuery, courseService]);

    const handleAddCourse = (name, semester, professor, universityChair, examDate, examAdmission, tutorial, oldExam, bonusPoints, authorId) => {
        console.log(name, semester, professor, universityChair, examDate, examAdmission, tutorial, oldExam, bonusPoints, authorId)
        courseService
            .requestCreateCourse(name, semester, professor, universityChair, examDate, examAdmission, tutorial, oldExam, bonusPoints, authorId)
            .then((res) => {
                setCourses((prevState) => [...prevState, res.data]);
            })
            .catch((error) => {
                console.error("[Error]: " + error);
            });
    };

    const handleNavigateBackToCourses = () => {
        navigate("/courses"); // Navigiert zurück zur Seite "/courses"
    };

    return (
        <div>
            <CssBaseline />
            <Header siteInformation="Kurse hinzufügen" />
            <Grid
                container
                justifyContent="center"
                sx={{ minHeight: "95vh", py: 10, px: 2 }}
            >
                <Grid item xs={12} sm={8} md={6}>
                    <Grid
                        container
                        direction="column"
                        sx={{ p: 4, borderRadius: 10, border: "3px solid #d6d4d4" }}
                        spacing={3} // Spacing hier anpassen für bessere Abstände
                    >
                        <Typography variant="h5" align="center">
                            Add new Course
                        </Typography>
                        <Divider />
                        {/* AddCourse-Komponente wird hier eingebunden */}
                        <AddCourse handleAddCourse={handleAddCourse} />
                        <Divider />
                        {/* Button zum Zurückkehren zur Kursübersicht */}
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleNavigateBackToCourses}
                            sx={{
                                marginTop: 2,
                                padding: "10px 20px",
                                fontSize: "1rem",
                                borderRadius: "8px",
                                width: "100%", // Full width für den Button
                            }}
                        >
                            Zurück zu allen Kursen
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <Divider />
            <Footer />
        </div>
    );
}
