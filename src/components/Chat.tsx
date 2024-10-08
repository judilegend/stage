import React, { useState } from "react";
import Sidebar from "./SIdebar";

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: Date;
}

function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: "John", content: "Hello there!", timestamp: new Date() },
    {
      id: 2,
      sender: "You",
      content: "Hi John, how are you?",
      timestamp: new Date(),
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          sender: "You",
          content: newMessage,
          timestamp: new Date(),
        },
      ]);
      setNewMessage("");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <div className="bg-white shadow-md p-4">
          <h1 className="text-2xl font-bold">Chat</h1>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-4 ${message.sender === "You" ? "text-right" : ""}`}
            >
              <div
                className={`inline-block p-2 rounded-lg ${
                  message.sender === "You"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                <p className="font-bold">{message.sender}</p>
                <p>{message.content}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSendMessage} className="bg-white p-4">
          <div className="flex">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 border rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Chat;
