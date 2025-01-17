import React, { useEffect, useState } from "react";
import { Button, TextField, Checkbox, FormControlLabel } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const AddCourse = ({ handleAddCourse }) => {
    const [name, setName] = useState("");
    const [semester, setSemester] = useState("");
    const [professor, setProfessor] = useState("");
    const [universityChair, setUniversityChair] = useState("");
    const [examDate, setExamDate] = useState(new Date()); // Default to the current date
    const [tutorial, setTutorial] = useState(false);
    const [authorId, setAuthorId] = useState(Cookies.get("auth")||"");
    const sessionId = Cookies.get("auth");
    const navigate = useNavigate();

    useEffect(() => {
        if (!sessionId) {
            navigate("/");
            setAuthorId(sessionId);
        }
    }, []);

    const handleAddCourseAndClearTextfield = () => {
        handleAddCourse(name, semester, professor, universityChair, examDate, tutorial, authorId);
        setName("");
        setSemester("");
        setProfessor("");
        setUniversityChair("");
        setExamDate(new Date());
        setTutorial(false);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Grid container spacing={4} sx={{ py: 2 }}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        placeholder="Name of the course"
                        size="small"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        placeholder="Semester"
                        size="small"
                        onChange={(e) => setSemester(e.target.value)}
                        value={semester}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        placeholder="Professor of the course"
                        size="small"
                        onChange={(e) => setProfessor(e.target.value)}
                        value={professor}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        placeholder="University Chair of the course"
                        size="small"
                        onChange={(e) => setUniversityChair(e.target.value)}
                        value={universityChair}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    {/* DatePicker for Exam Date */}
                    <DatePicker
                        label="Exam date of the course"
                        value={examDate}
                        onChange={(date) => setExamDate(date)}
                        renderInput={(params) => <TextField fullWidth size="small" {...params} />}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    {/* Checkbox for Tutorial */}
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={tutorial}
                                onChange={(e) => setTutorial(e.target.checked)}
                            />
                        }
                        label="Tutorial of the course"
                    />
                </Grid>

                <Grid item xs={12}>
                    <Button variant="contained" onClick={handleAddCourseAndClearTextfield}>
                        Add
                    </Button>
                </Grid>
            </Grid>
        </LocalizationProvider>
    );
};

export default AddCourse;
