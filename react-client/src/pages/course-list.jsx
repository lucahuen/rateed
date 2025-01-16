import React, {useContext, useEffect, useState} from "react";
import {CssBaseline, Divider, Button} from "@mui/material";
import Grid from "@mui/material/Grid2";
import Header from "../components/header";
import Course from "../components/course";
import Footer from "../components/footer";
import {ApiContext} from "../context/api-context";
import Searchbar from "../components/searchbar.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import Cookies from "js-cookie";

export default function CourseList() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    let initialQuery = queryParams.get("query") || ""; // Default ist ein leerer String

    const sessionId = Cookies.get("auth")

    const [courses, setCourses] = useState([]);
    const [searchInput, setSearchInput] = useState('');

    const {courseService} = useContext(ApiContext);
    const navigate = useNavigate(); // Hier wird der useNavigate-Hook verwendet

    useEffect(() => {
        if(!sessionId){
            navigate("/")
        }
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

    const handleDeleteCourse = (id) => {
        courseService
            .requestDeleteCourse(id)
            .then(() => {
                setCourses((prevState) => {
                    return prevState.filter((course) => course._id !== id);
                });
            })
            .catch((error) => {
                console.error("[Error]: " + error);
            });
    };

    const handleAddCourse = (name, semester) => {
        courseService
            .requestCreateCourse(name, semester)
            .then((res) => {
                setCourses((prevState) => [...prevState, res.data]);
            })
            .catch((error) => {
                console.error("[Error]: " + error);
            });
    };

    const handleSearchBarInputChange = (e) => {
        const inputValue = e; // Der aktuelle Eingabewert
        setSearchInput(inputValue);
        handleSearch(inputValue)
    };

    const handleSearchBarClick = () => {
        handleSearch(searchInput)
    }

    const handleSearch = (query) => {
        courseService
            .requestCoursesByQueryName(query) // Nutzt den aktuellen Wert aus dem Parameter
            .then((res) => {
                setCourses(res.data);
            })
            .catch((error) => {
                console.error("[Error]: " + error);
            });
    };

    const handleNavigateToAddCourse = () => {
        navigate("/courses/add"); // Navigiert zur URL "/courses/add"
    };

    const handleBack = () => {
        navigate("/")
    }

    return (
        <div>
            <CssBaseline/>
            <Header siteInformation="Kurse"/>
            <Grid
                container
                justifyContent="center"
                sx={{minHeight: "95vh", py: 10, px: 2}}
            >
                <Grid size={{xs: 12, md: 8, lg: 5}}>
                    <Grid
                        container
                        direction="column"
                        sx={{p: 4, borderRadius: 2, border: "3px solid #d6d4d4"}}
                        spacing={1}
                    >
                        <Searchbar
                            searchInput={searchInput}
                            onInputChange={handleSearchBarInputChange}
                            onSearch={handleSearchBarClick}/>
                        <Divider/>
                        <Course courses={courses} handleDeleteCourse={handleDeleteCourse}/>

                        {/* Button zur AddCourse-Seite */}
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleNavigateToAddCourse}
                            sx={{
                                marginTop: 2,
                                padding: "10px 20px",
                                fontSize: "1rem",
                                borderRadius: "8px",
                            }}
                        >
                            Kurs hinzufügen
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleBack}
                            sx={{
                                marginTop: 2,
                                padding: "10px 20px",
                                fontSize: "1rem",
                                borderRadius: "8px",
                            }}
                        >
                            Zurück zur Startseite
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <Divider/>
            <Footer/>
        </div>
    );
}
