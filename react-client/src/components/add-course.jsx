import React, { useEffect, useState } from "react";
import { Button, TextField, Checkbox, FormControlLabel } from "@mui/material";
import Grid from "@mui/material/Grid";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const AddCourse = ({ handleAddCourse }) => {
    const [name, setName] = useState("");
    const [semester, setSemester] = useState("");
    const [professor, setProfessor] = useState("");
    const [universityChair, setUniversityChair] = useState("");
    const [examDate, setExamDate] = useState(new Date());
    const [tutorial, setTutorial] = useState(false);
    const [bonusPoints, setBonusPoints] = useState(false);
    const [oldExam, setOldExam] = useState(false);
    const [examAdmission, setExamAdmission] = useState(false);
    const [authorId, setAuthorId] = useState(Cookies.get("auth") || "");
    const sessionId = Cookies.get("auth");
    const navigate = useNavigate();

    useEffect(() => {
        if (!sessionId) {
            navigate("/");
            setAuthorId(sessionId);
        }
    }, []);

    const handleAddCourseAndClearTextfield = () => {
        // same order as in course-model
        handleAddCourse(name, semester, professor, universityChair, examDate, examAdmission, tutorial, oldExam, bonusPoints, authorId);
        setName("");
        setSemester("");
        setProfessor("");
        setUniversityChair("");
        setExamDate(new Date());
        setTutorial(false);
        setBonusPoints(false);
        setOldExam(false);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Grid container spacing={2}>
                {/* Name */}
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        placeholder="Name of the course"
                        size="small"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        label="Course Name"
                    />
                </Grid>

                {/* Semester */}
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        placeholder="Semester"
                        size="small"
                        onChange={(e) => setSemester(e.target.value)}
                        value={semester}
                        label="Semester"
                    />
                </Grid>

                {/* Professor */}
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        placeholder="Professor of the course"
                        size="small"
                        onChange={(e) => setProfessor(e.target.value)}
                        value={professor}
                        label="Professor"
                    />
                </Grid>

                {/* University Chair */}
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        placeholder="University Chair of the course"
                        size="small"
                        onChange={(e) => setUniversityChair(e.target.value)}
                        value={universityChair}
                        label="University Chair"
                    />
                </Grid>

                {/* Exam Date */}
                <Grid item xs={12}>
                    <DatePicker
                        label="Exam Date"
                        value={examDate}
                        onChange={(date) => setExamDate(date)}
                    />
                </Grid>
                {/* Exam Admissiom */}
                <Grid item xs={12}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={examAdmission}
                                onChange={(e) => setExamAdmission(e.target.checked)}
                            />
                        }
                        label="Exam Admission"
                    />
                </Grid>
                {/* Tutorial */}
                <Grid item xs={12}>
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

                {/* Bonus Points */}
                <Grid item xs={12}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={bonusPoints}
                                onChange={(e) => setBonusPoints(e.target.checked)}
                            />
                        }
                        label="Has Bonus Points"
                    />
                </Grid>

                {/* Old Exams */}
                <Grid item xs={12}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={oldExam}
                                onChange={(e) => setOldExam(e.target.checked)}
                            />
                        }
                        label="Old Exams Exist"
                    />
                </Grid>

                {/* Submit Button */}
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        fullWidth
                        onClick={handleAddCourseAndClearTextfield}
                    >
                        Add Course
                    </Button>
                </Grid>
            </Grid>
        </LocalizationProvider>
    );
};

export default AddCourse;
