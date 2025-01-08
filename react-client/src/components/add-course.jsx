import React, {useState} from "react";
import {Button, TextField} from "@mui/material";
import Grid from "@mui/material/Grid2";

// * AddTodo component
const AddCourse = ({handleAddCourse}) => {
    const [addTask, setAddTask] = useState("");

    const handleChange = (event) => {
        setAddTask(event.target.value);
    };

    const handleAddCourseAndClearTextfield = () => {
        handleAddCourse(addTask);
        setAddTask("");
    };

    return (
        <>
            <Grid container spacing={1} sx={{py: 2}}>
                <Grid size="grow">
                    <TextField
                        fullWidth
                        placeholder="Type sth"
                        size="small"
                        onChange={handleChange}
                        value={addTask}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleAddCourseAndClearTextfield();
                            }
                        }}
                    />
                </Grid>

                <Button variant="contained" onClick={() => handleAddCourse(addTask)}>
                    Add
                </Button>
            </Grid>
        </>
    );
};

export default AddCourse;
