import React from "react";
import {Card, CardHeader, Typography, Container, IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export function MessageList({messages, handleDeleteMessage, username}) {

    const handleDelete = (id) => {
        handleDeleteMessage(id)
    }

    return (
        <Container maxWidth="sm" style={{marginTop: "20px"}}>
            {messages?.length ? (
                <Typography gutterBottom variant="h6">
                    Most recent Posts:
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
                            "&:hover": {backgroundColor: "#f5f5f5"},
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
                            action={message.username === username ?
                                <IconButton
                                    color="error"
                                    onClick={() => handleDelete(message._id)}
                                >
                                    <DeleteIcon/>
                                </IconButton> : (<div></div>)
                            }
                        />
                    </Card>
                );
            })}

        </Container>
    );
}
