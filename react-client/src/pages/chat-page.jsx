import React, { useState, useEffect } from "react";
import { ChatService } from "../services/ChatService";
import { MessageList } from "../components/MessageList";
import { MessageForm } from "../components/MessageForm";

export function ChatPage() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const fetchedMessages = await ChatService.fetchMessages();
        setMessages(fetchedMessages);
      } catch (error) {
        console.error("Fehler beim Laden der Nachrichten:", error);
      }
    };
    loadMessages();
  }, []);

  const handleSendMessage = async (message) => {
    try {
      await ChatService.sendMessage(message);
      const updatedMessages = await ChatService.fetchMessages();
      setMessages(updatedMessages);
    } catch (error) {
      console.error("Fehler beim Senden der Nachricht:", error);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
      <h1>Public Chat</h1>
      <MessageList messages={messages} />
      <MessageForm onSendMessage={handleSendMessage} />
    </div>
  );
}