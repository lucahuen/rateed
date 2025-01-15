import React, {useState, useEffect, useContext} from "react";
import {MessageList} from "../components/message-list.jsx";
import {MessageForm} from "../components/message-form.jsx";
import {ApiContext} from "../context/api-context.jsx";
import Header from "../components/header.jsx";
import {Box, CssBaseline} from "@mui/material";
import Footer from "../components/footer.jsx";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";

export function ChatPage() {
    const [messages, setMessages] = useState([]);
    const {chatService} = useContext(ApiContext);
    const navigate = useNavigate();
    const sessionId = Cookies.get("auth")
    if (!sessionId) {
        navigate("/login")
    }

    useEffect(() => {
        updateMessages()
    }, [])

    const updateMessages = () => {
        chatService
            .requestMessages()
            .then((res) => {
                setMessages(res.data)
            })
            .catch((error) => {
                console.error("ERROR: Fehler beim Laden der Nachrichten:... " + error)
            });
    }

    const handleSendMessage = (username, text) => {
        try {
            chatService.requestSendMessage(username, text)
                .then(() => {
                    console.log("Success")
                    updateMessages()
                })
                .catch((error) => {
                    console.error("Error sending message: ", error)
                });

        } catch (error) {
            console.error("Fehler beim Senden der Nachricht:", error);
        }
    };

    return (
        <Box>
            <CssBaseline/>
            <Header siteInformation={"Chat"}/>
            <div style={{
                maxWidth: "600px",
                margin: "0 auto",
                padding: "20px",
                border: "1px solid #ddd",
                borderRadius: "8px"
            }}>
                <h1>Public Chat</h1>

                <MessageForm onSendMessage={handleSendMessage}/>

                <MessageList messages={messages}/>
            </div>
            <Footer/>
        </Box>
    );
}