import React, {useState} from "react";
import {Button, TextField} from "@mui/material";
import Grid from "@mui/material/Grid2";


// * AddTodo component
const AddCourse = ({handleAddCourse}) => {
    const [addCourseName, setAddTask] = useState("");
    const [addCourseSemester, setAddTask2] = useState("");
    const [addCourseProfessor, setAddTask3] = useState("");
    const [addCourseUniversity_Chair, setAddTask4] = useState("");
    const [addCourseScore, setAddTask5] = useState("");
    const [addCourseExam_date, setAddTask6] = useState(new Date(2001, 1, 1));
    //const [addCourseOld_exam, setAddTask7] = useState(false);
    const [addCourseTutorial, setAddTask8] = useState(false);
    const [addCourseAuthor_id, setAddTask9] = useState("");


    const handleChange = (event) => {
        setAddTask(event.target.value);
    };

    const handleChange2 = (event) => {
        setAddTask2(event.target.value);
    };

    const handleChange3 = (event) => {
        setAddTask3(event.target.value);
    };

    const handleChange4 = (event) => {
        setAddTask4(event.target.value);
    };

    const handleChange5 = (event) => {
        setAddTask5(event.target.value);
    };

    const handleChange6 = (event) => {
        setAddTask6(event.target.value);
    };

   /* const handleChange7 = (event) => {
        setAddTask7(event.target.value);
    };*/

    const handleChange8 = (event) => {
        setAddTask8(event.target.value);
    };

    const handleChange9 = (event) => {
        setAddTask9(event.target.value);
    };

    const handleAddCourseAndClearTextfield = () => {
        handleAddCourse(addCourseName, addCourseSemester, addCourseProfessor, addCourseUniversity_Chair, addCourseScore, addCourseTutorial, addCourseAuthor_id, addCourseExam_date );
        setAddTask("");
        setAddTask2("");
        setAddTask3("");
        setAddTask4("");
        setAddTask5("");
        setAddTask6(new Date());
        //setAddTask7(false);
        setAddTask8(false);
        setAddTask9("");
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
                        onChange={handleChange6}
                        value={addCourseExam_date}
                    />
                </Grid>

                <Grid item xs={12} sm={6}> {/* Adjust size as needed */}
                    <TextField
                        fullWidth
                        placeholder="Old exams of the course"
                        size="small"
                        //onChange={handleChange7}
                        //value={addCourseOld_exam}
                    />
                </Grid>

                <Grid item xs={12} sm={6}> {/* Adjust size as needed */}
                    <TextField
                        fullWidth
                        placeholder="Tutorial of the course"
                        size="small"
                        onChange={handleChange8}
                        value={addCourseTutorial}
                    />
                </Grid>

                <Grid item xs={12} sm={6}> {/* Adjust size as needed */}
                    <TextField
                        fullWidth
                        placeholder="Author_id of the course"
                        size="small"
                        onChange={handleChange9}
                        value={addCourseAuthor_id}
                    />
                </Grid>
                    <Grid item xs={12} sm={6}> {/* Adjust size as needed */}
                    <TextField
                        fullWidth
                        placeholder="Semester"
                        size="small"
                        onChange={handleChange2}
                        value={addCourseSemester}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleAddCourseAndClearTextfield();
                            }
                        }}
                    />
                </Grid>

                <Button variant="contained" onClick={() => handleAddCourse(addCourseName, addCourseSemester, addCourseProfessor, addCourseUniversity_Chair, addCourseScore, addCourseTutorial, addCourseExam_date, addCourseAuthor_id)}>
                    Add
                </Button>
            </Grid>
        </>
    );
};

export default AddCourse;
