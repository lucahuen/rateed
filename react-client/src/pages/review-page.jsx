import React, {useContext, useEffect, useState} from "react";
import Header from "../components/header";
import Footer from "../components/footer.jsx";
import {Box, CssBaseline} from "@mui/material";
import Grid from "@mui/material/Grid2";
import Cookies from "js-cookie";
import {useLocation, useNavigate} from "react-router-dom";
import {ApiContext} from "../context/api-context.jsx";


export default function ReviewPage() {

    const sessionId = Cookies.get("auth");
    const navigate = useNavigate();
    const {courseService} = useContext(ApiContext);

    const location= useLocation();
    const queryParams = new URLSearchParams(location.search);
    const courseId = queryParams.get("courseId") || ""; // Default ist ein leerer String


    // if (!sessionId) {
    //    navigate("/login");
    //}

    const [course, setCourse] = useState("");


    useEffect(() => {
        courseService
            .requestCourseById(courseId)
            .then((res) => {
                setCourse(res.data);
            })
            .catch((error) =>{
                console.error("[Error]: " + error);
            })
    }, []);

    return (
        <div style={{
            textAlign: "center",
            fontFamily: "Arial, Helvetica, sans-serif"
        }}>
            <CssBaseline/>
            <Header siteInformation={`Review erstellen zu ${course?.name}`} />

            <Box
                sx={{
                    display: 'flex',
                    backgroundColor: 'black',
                    width: '50%',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '80vh',
                    gap: 2,
                    padding: 2
                }}
            />


            <Footer/>

        </div>


    );
}
