import React from "react";
import { MessageItem } from "./MessageItem";
import React, {useState} from "react";
import {Button, TextField} from "@mui/material";
import Grid from "@mui/material/Grid2";

export function MessageList({ messages }) {
  return (
    <div>
      {messages.map((message, index) => (
        <MessageItem key={index} message={message} />
      ))}
    </div>
  );
}