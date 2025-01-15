import React from "react";


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