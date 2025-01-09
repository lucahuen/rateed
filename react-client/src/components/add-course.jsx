import React, {useState} from "react";
import {Button, TextField} from "@mui/material";
import Grid from "@mui/material/Grid2";

// * AddTodo component
const AddCourse = ({handleAddCourse}) => {
    const [addCourseName, setAddTask] = useState("");
    const [addCourseSemester, setAddTask2] = useState("");

    const handleChange = (event) => {
        setAddTask(event.target.value);
    };

    const handleChange2 = (event) => {
        setAddTask2(event.target.value);
    };

    const handleAddCourseAndClearTextfield = () => {
        handleAddCourse(addCourseName, addCourseSemester);
        setAddTask("");
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
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleAddCourseAndClearTextfield();
                            }
                        }}
                    />
                </Grid>

                <Button variant="contained" onClick={() => handleAddCourse(addCourseName, addCourseSemester)}>
                    Add
                </Button>
            </Grid>
        </>
    );
};

export default AddCourse;
