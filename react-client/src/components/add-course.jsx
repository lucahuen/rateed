import React, {useState} from "react";
import {Button, TextField} from "@mui/material";
import Grid from "@mui/material/Grid2";


// * AddTodo component
const AddCourse = ({handleAddCourse}) => {
    const [addCourseName, setAddCourseName] = useState("");
    const [addCourseSemester, setAddCourseSemester] = useState("");
    const [addCourseProfessor, setAddCourseProfessor] = useState("");
    const [addCourseUniversity_Chair, setAddUniversity_Chair] = useState("");
    const [addCourseScore, setAddCourseScore] = useState("");
    const [addCourseExam_date, setAddExam_date] = useState(new Date(2001, 1, 1));
    const [addCourseTutorial, setAddCourseTutorial] = useState(false);
    const [addCourseAuthor_Id, setAddAuthor_Id] = useState(1);


    const handleChange = (event) => {
        setAddCourseName(event.target.value);
    };

    const handleChange2 = (event) => {
        setAddCourseSemester(event.target.value);
    };

    const handleChange3 = (event) => {
        setAddCourseProfessor(event.target.value);
    };

    const handleChange4 = (event) => {
        setAddUniversity_Chair(event.target.value);
    };

    const handleChange5 = (event) => {
        setAddCourseScore(event.target.value);
    };

    const handleChange6 = (event) => {
        setAddExam_date(event.target.value);
    };

    const handleChange8 = (event) => {
        setAddCourseTutorial(event.target.value);
    };

    const handleChange9 = (event) => {
        setAddAuthor_Id(event.target.value);
    };

    const handleAddCourseAndClearTextfield = () => {
        handleAddCourse(addCourseName, addCourseSemester, addCourseProfessor, addCourseUniversity_Chair, addCourseScore, addCourseTutorial, addCourseAuthor_Id, addCourseExam_date );
        setAddCourseSemester("");
        setAddCourseProfessor("");
        setAddUniversity_Chair("");
        setAddCourseScore("");
        setAddExam_date(new Date());
        setAddCourseTutorial(false)
        setAddAuthor_Id(0);

    };

    return (
        <>
            <Grid container spacing={4} sx={{py: 2}}>
                <Grid item xs={12} sm={6}> {/* Adjust size as needed */}
                    <TextField
                        fullWidth
                        placeholder="Name of the course"
                        size="small"
                        onChange={handleChange}
                        value={addCourseName}
                    />
                </Grid>

                <Grid item xs={12} sm={6}> {/* Adjust size as needed */}
                    <TextField
                        fullWidth
                        placeholder="Semester"
                        size="small"
                        onChange={handleChange2}
                        value={addCourseSemester}
                    />
                </Grid>

                <Grid item xs={12} sm={6}> {/* Adjust size as needed */}
                    <TextField
                        fullWidth
                        placeholder="Professor of the course"
                        size="small"
                        onChange={handleChange3}
                        value={addCourseProfessor}
                    />
                </Grid>

                <Grid item xs={12} sm={6}> {/* Adjust size as needed */}
                    <TextField
                        fullWidth
                        placeholder="University Chair of the course"
                        size="small"
                        onChange={handleChange4}
                        value={addCourseUniversity_Chair}
                    />
                </Grid>

                <Grid item xs={12} sm={6}> {/* Adjust size as needed */}
                    <TextField
                        fullWidth
                        placeholder="Score of the course"
                        size="small"
                        onChange={handleChange5}
                        value={addCourseScore}
                    />
                </Grid>

                <Grid item xs={12} sm={6}> {/* Adjust size as needed */}
                    <TextField
                        fullWidth
                        placeholder="Exam date of the course"
                        size="small"
                        onChange={handleChange8}
                        value={addCourseExam_date}
                    />
                </Grid>

                <Grid item xs={12} sm={6}> {/* Adjust size as needed */}
                    <TextField
                        fullWidth
                        placeholder="Tutorial of the course"
                        size="small"
                        onChange={handleChange6}
                        value={addCourseTutorial}
                    />
                </Grid>

                <Grid item xs={12} sm={6}> {/* Adjust size as needed */}
                    <TextField
                        fullWidth
                        placeholder="Author_id of the course"
                        size="small"
                        onChange={handleChange9}
                        value={addCourseAuthor_Id}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleAddCourseAndClearTextfield();
                            }
                        }}
                    />
                </Grid>
                <Button variant="contained" onClick={() => handleAddCourse(addCourseName, addCourseSemester, addCourseProfessor, addCourseUniversity_Chair, addCourseScore,addCourseExam_date, addCourseTutorial, addCourseAuthor_Id)}>
                    Add
                </Button>
            </Grid>
        </>
    );
};

export default AddCourse;
