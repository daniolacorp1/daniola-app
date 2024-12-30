"use client";

import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { commodities } from "@/data/commodities";
import { ChatMessages } from "../components/commodities-chat/ChatMessages";
import { ChatInput } from "../components/commodities-chat/ChatInput";
import { Message } from "@/types/chat";

const CommoditiesChat = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm here to help you with commodity-related questions. Feel free to ask about prices, market trends, or specific commodities.",
      sender: "assistant",
      assistantName: "Elliott",
      time: new Date().toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const generateResponse = (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase();
    let response =
      "I'll help you with that request. What specific details would you like to know?";

    commodities.forEach((commodity) => {
      if (lowerMessage.includes(commodity.name.toLowerCase())) {
        response = `${commodity.name} is currently priced at $${commodity.price}. ${commodity.description}`;
      }
    });

    if (lowerMessage.includes("price") || lowerMessage.includes("cost")) {
      response =
        "Here are the current prices of our main commodities:\n" +
        commodities.map((c) => `${c.name}: $${c.price}`).join("\n");
    }

    return response;
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: newMessage,
      sender: "user",
      time: new Date().toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setNewMessage("");
    setIsTyping(true);

    setTimeout(() => {
      const aiMessage: Message = {
        id: Date.now() + 1,
        text: generateResponse(newMessage),
        sender: "assistant",
        assistantName: "Elliott",
        time: new Date().toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleVoice = () => {
    toast({
      title: "Voice Recognition",
      description: "Voice recognition is not available yet.",
    });
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="flex-1 ">
        <ChatMessages messages={messages} />
      </div>
      <ChatInput
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        handleSendMessage={handleSendMessage}
        handleKeyPress={handleKeyPress}
        handleVoice={handleVoice}
      />
    </div>
  );
};

export default CommoditiesChat;
