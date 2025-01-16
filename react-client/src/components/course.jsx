import React from "react";
import {Button, Card, CardHeader, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

// * Course component
const Course = ({courses}) => {
    const navigate = useNavigate();

    const handleGetToCourse = (id) => {
        navigate(`/courses/course?query=${encodeURIComponent(id)}`);
    }

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
                            title={<Button key={course.id} onClick={() => handleGetToCourse(course._id)}>{course.name}</Button>}
                        />
                    </Card>
                );
            })}
        </>
    );
};

export default Course;
