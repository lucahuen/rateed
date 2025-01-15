import React from "react";
import { Card, CardHeader, Typography, Container } from "@mui/material";

export function MessageList({ messages }) {

    return (
        <Container maxWidth="sm" style={{ marginTop: "20px" }}>
            {messages?.length ? (
                <Typography gutterBottom variant="h6">
                    #{messages.length} messages found!
                </Typography>
            ) : (
                <Typography gutterBottom variant="h6">
                    No messages found!
                </Typography>
            )}

            {messages?.map((message, index) => {
                return (
                    <Card
                        key={index}
                        sx={{
                            borderRadius: 2,
                            "&:hover": { backgroundColor: "#f5f5f5" },
                            border: "1px solid #b7b7b7",
                            marginBottom: 2,
                        }}
                        elevation={0}
                    >
                        <CardHeader
                            title={
                                <Typography variant="body1" component="span">
                                    <strong>{message.username}:</strong> {message.text}
                                </Typography>
                            }
                        />
                    </Card>
                );
            })}

        </Container>
    );
}
