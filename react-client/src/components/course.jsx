import React from "react";
import {Card, CardHeader, IconButton, Typography} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

// * Course component
const Course = (props) => {
    const {courses, handleDeleteCourse} = props;

    return (
        <>
            {courses?.length ? (
                <Typography gutterBottom>#{courses.length} courses found!</Typography>
            ) : (
                <Typography gutterBottom>No courses found!</Typography>
            )}

            {courses?.map((course, index) => {
                return (
                    <Card
                        key={index}
                        sx={{
                            borderRadius: 2,
                            "&:hover": {backgroundColor: "#f5f5f5"},
                            border: "1px solid #b7b7b7",
                        }}
                        elevation="0"
                    >
                        <CardHeader
                            title={<Typography key={course.id}>{course.name}</Typography>}
                            action={
                                <IconButton
                                    color="error"
                                    onClick={() => handleDeleteCourse(course._id)}
                                >
                                    <DeleteIcon/>
                                </IconButton>
                            }
                        />
                    </Card>
                );
            })}
        </>
    );
};

export default Course;
