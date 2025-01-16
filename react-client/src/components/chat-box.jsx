import React, { useState, useEffect, useContext } from "react";
import { MessageList } from "./message-list.jsx";
import { MessageForm } from "./message-form.jsx";
import { ApiContext } from "../context/api-context.jsx";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Container, Paper, Typography } from "@mui/material";

const ChatBox = () => {
    const [messages, setMessages] = useState([]);
    const { chatService, courseService, userService } = useContext(ApiContext);
    const navigate = useNavigate();
    const sessionId = Cookies.get("auth");
    const [course, setCourse] = useState(null);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const courseId = queryParams.get("query") || "";
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
        getUsername();
    }, []);

    const handleDeleteMessages = (id) => {
        chatService
            .requestDeleteMessage(id)
            .then(() => {
                updateMessages();
            })
            .catch((error) => {
                console.error(error);
            });
    };

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
    };

    const updateMessages = () => {
        chatService
            .requestMessagesOfCourse(courseId)
            .then((res) => {
                console.log(res);
                setMessages(res.data.reverse());
            })
            .catch((error) => {
                console.error("ERROR: Fehler beim Laden der Nachrichten:... " + error);
            });
    };

    const handleSendMessage = (username, text) => {
        try {
            chatService
                .requestSendMessage(username, text, courseId)
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
            <Container maxWidth={"md"} sx={{ mt: 4, mb: 4 }}>
                <Paper elevation={3} sx={{ p: 3, borderRadius: 2, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
                    <Typography
                        variant="h4"
                        component="h1"
                        align="center"
                        gutterBottom
                        sx={{ fontWeight: "bold", color: "#333" }}
                    >
                        Kursforum
                    </Typography>

                    <MessageForm onSendMessage={handleSendMessage} sx={{ width: '100%' }} />

                    <Box mt={3} sx={{ width: '100%' }}>
                        <MessageList messages={messages} handleDeleteMessage={handleDeleteMessages} username={username} />
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default ChatBox;
