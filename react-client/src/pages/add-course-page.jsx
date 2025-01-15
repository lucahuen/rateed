import React, { useContext, useEffect, useState } from "react";
import { CssBaseline, Typography, Divider, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Header from "../components/header";
import AddCourse from "../components/add-course";
import Footer from "../components/footer";
import { ApiContext } from "../context/api-context";
import { useLocation, useNavigate } from "react-router-dom";

export default function AddCoursePage() {
    //todo: reload page when add was pressed and alert user of success/error
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    let initialQuery = queryParams.get("query") || ""; // Default ist ein leerer String

    const [courses, setCourses] = useState([]);
    const [searchInput, setSearchInput] = useState('');

    const { courseService } = useContext(ApiContext);
    const navigate = useNavigate(); // Hier wird der useNavigate-Hook verwendet

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

    const handleAddCourse = (name, semester, professor, university_chair, score, exam_date, tutorial, author_id) => {
        courseService
            .requestCreateCourse(name, semester, professor, university_chair, score, exam_date, tutorial, author_id)
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
                <Grid size={{ xs: 12, md: 8, lg: 5 }}>
                    <Grid
                        container
                        direction="column"
                        sx={{ p: 4, borderRadius: 2, border: "3px solid #d6d4d4" }}
                        spacing={1}
                    >
                        <Typography variant="h5" align="center">
                            Add new Course
                        </Typography>
                        <Divider />
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
