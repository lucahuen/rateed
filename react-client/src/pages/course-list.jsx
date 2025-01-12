import React, {useContext, useEffect, useState} from "react";
import {CssBaseline, Typography, Divider} from "@mui/material";
import Grid from "@mui/material/Grid2";
import Header from "../components/header";
import Course from "../components/course";
import AddCourse from "../components/add-course";
import Footer from "../components/footer";
import {ApiContext} from "../context/api-context";
import Searchbar from "../components/searchbar.jsx";

export default function CourseList() {
    let [courses, setCourses] = useState([]);
    const [searchInput, setSearchInput] = useState('');

    const {courseService} = useContext(ApiContext);

    useEffect(() => {
        courseService
            .requestAllCourses()
            .then((res) => {
                setCourses(res.data);
            })
            .catch((error) => {
                console.error("[Error]: " + error);
            });
    }, []);

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
        handleSearch(inputValue); // Übergibt den aktuellen Wert direkt an die Suche
    };

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
                        <Typography variant="h5" align="center">
                            Well just add a Course you dumb fuck should i explain it to you or what?
                        </Typography>
                        <Divider/>
                        <AddCourse handleAddCourse={handleAddCourse}/>
                        <Divider/>
                        <Searchbar
                            searchInput={searchInput}
                            onInputChange={handleSearchBarInputChange}
                            onSearch={handleSearch}/>
                        <Divider/>
                        <Course courses={courses} handleDeleteCourse={handleDeleteCourse}/>
                    </Grid>
                </Grid>
            </Grid>
            <Divider/>
            <Footer/>
        </div>
    );
}
