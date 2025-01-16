import React, {useState, useEffect, useContext} from "react";
import {MessageList} from "../components/message-list.jsx";
import {MessageForm} from "../components/message-form.jsx";
import {ApiContext} from "../context/api-context.jsx";
import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import Cookies from "js-cookie";
import {useLocation, useNavigate} from "react-router-dom";
import {Box, CssBaseline, Container, Paper, Typography} from "@mui/material";

export function ChatPage() {
    const [messages, setMessages] = useState([]);
    const {chatService, courseService, userService} = useContext(ApiContext);
    const navigate = useNavigate();
    const sessionId = Cookies.get("auth");
    const [course, setCourse] = useState(null);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const courseId = queryParams.get("courseId") || "";
    const [username, setUsername] = useState("");

    if (!sessionId) {
        navigate("/login");
    }

    useEffect(() => {
        if (courseId) {
            updateMessages();
            courseService
                .requestCourseById(courseId)
                .then((res) => {
                    setCourse(res.data);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
        getUsername()
    }, []);

    const handleDeleteMessages = (id) => {
        chatService
            .requestDeleteMessage(id)
            .then(() => {
                updateMessages()
            })
            .catch((error) => {
                console.error(error)
            })
    }

    const getUsername = () => {
        userService
            .requestUserById(sessionId)
            .then((res) => {
                setUsername(res.user.username);
            })
            .catch((error) => {
                console.log(error);
                console.log("Fehler beim Laden der Benutzerdaten.");
            });
    }

    const updateMessages = () => {
        chatService
            .requestMessagesOfCourse(courseId)
            .then((res) => {
                console.log(res)
                setMessages(res.data.reverse());
            })
            .catch((error) => {
                console.error("ERROR: Fehler beim Laden der Nachrichten:... " + error);
            });
    };

    const handleSendMessage = (username, text) => {
        try {
            chatService.requestSendMessage(username, text, courseId)
                .then(() => {
                    console.log("Success");
                    updateMessages();
                })
                .catch((error) => {
                    console.error("Error sending message: ", error);
                });
        } catch (error) {
            console.error("Fehler beim Senden der Nachricht:", error);
        }
    };

    return (
        <Box>
            <CssBaseline/>
            <Header siteInformation="Chat"/>
            <Container maxWidth="sm" sx={{mt: 4, mb: 4}}>
                <Paper elevation={3} sx={{p: 3, borderRadius: 2}}>
                    <Typography
                        variant="h4"
                        component="h1"
                        align="center"
                        gutterBottom
                        sx={{fontWeight: "bold", color: "#333"}}
                    >
                        Kursforum: {course ? course.name : "Lädt..."}
                    </Typography>

                    <MessageForm onSendMessage={handleSendMessage}/>

                    <Box mt={3}>
                        <MessageList messages={messages} handleDeleteMessage={handleDeleteMessages}
                                     username={username}/>
                    </Box>
                </Paper>
            </Container>
            <Footer/>
        </Box>
    );
}
