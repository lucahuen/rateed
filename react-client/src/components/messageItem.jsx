import React from "react";
import React, {useState} from "react";
import {Button, TextField} from "@mui/material";
import Grid from "@mui/material/Grid2";


export function MessageItem({ message }) {
  return (
    <div style={{ marginBottom: "10px", borderBottom: "1px solid #ddd", padding: "5px" }}>
      <strong>{message.username}:</strong> {message.text}
      <div style={{ fontSize: "small", color: "gray" }}>
        {new Date(message.timestamp).toLocaleString()}
      </div>
    </div>
  );
}