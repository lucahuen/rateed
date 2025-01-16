import React, {useContext, useState} from "react";
import {Button, Container, TextField, Box, Typography} from "@mui/material";
import Cookies from "js-cookie";
import {ApiContext} from "../context/api-context.jsx";

export function MessageForm({onSendMessage}) {
    const [text, setText] = useState("");
    const sessionId = Cookies.get("auth");
    const {userService} = useContext(ApiContext);

    const handleSubmit = () => {
        userService
            .requestUserById(sessionId)
            .then((res) => {
                onSendMessage(res.user.username, text);
                setText(""); // Nachrichtentext leeren
            })
            .catch((error) => {
                console.error("ERROR: ", error)
            })
    };

    return (
        <Container maxWidth="sm" style={{marginTop: "20px", textAlign: "center"}}>
            <Typography variant="h5" gutterBottom>
                Sende eine Nachricht
            </Typography>
            <Box
                component="form"
                noValidate
                autoComplete="off"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                }}
            >
                <TextField
                    label="Nachricht"
                    variant="outlined"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    multiline
                    rows={4}
                    fullWidth
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    disabled={!text} // Disable button if fields are empty
                >
                    Senden
                </Button>
            </Box>
        </Container>
    );
}