import axios from "axios";
import { Message } from "../models/Message";
import api from "../utils/backend.js";

const API_URL = "http://localhost:5000";

export class ChatService {
  static async fetchMessages() {
    const response = await axios.get(`${API_URL}/messages`);
    return response.data.map(
      (msg) => new Message(msg.username, msg.text, new Date(msg.timestamp))
    );
  }

  static async sendMessage(message) {
    await axios.post(`${API_URL}/messages`, {
      username: message.username,
      text: message.text,
      timestamp: message.timestamp,
    });
  }
}