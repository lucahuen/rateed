import React, { useState } from "react";
import { Message } from "../models/Message";
import React, {useState} from "react";
import {Button, TextField} from "@mui/material";
import Grid from "@mui/material/Grid2";


export function MessageForm({ onSendMessage }) {
  const [username, setUsername] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !text) return;

    const message = new Message(username, text);
    onSendMessage(message);
    setText(""); // Nachrichtentext leeren
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ marginRight: "10px" }}
      />
      <input
        type="text"
        placeholder="Message"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ marginRight: "10px" }}
      />
      <button type="submit">Send</button>
    </form>
  );
}