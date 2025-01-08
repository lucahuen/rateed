import React, {useContext, useEffect, useState} from "react";
import {CssBaseline, Typography, Divider} from "@mui/material";
import Grid from "@mui/material/Grid2";
import Header from "../components/header";
import Course from "../components/course";
import AddCourse from "../components/add-course";
import Footer from "../components/footer";
import {ApiContext} from "../context/api-context";

export default function CourseList() {
    const [courses, setCourses] = useState([]);
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

    const handleAddCourse = (name) => {
        courseService
            .requestCreateCourse(name)
            .then((res) => {
                setCourses((prevState) => [...prevState, res.data]);
            })
            .catch((error) => {
                console.error("[Error]: " + error);
            });
    };

    return (
        <div>
            <CssBaseline/>
            <Header/>
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
                            A Simple Course List1
                        </Typography>
                        <Divider/>
                        <AddCourse handleAddCourse={handleAddCourse}/>

                        <Course courses={courses} handleDeleteCourse={handleDeleteCourse}/>
                    </Grid>
                </Grid>
            </Grid>
            <Divider/>
            <Footer/>
        </div>
    );
}
