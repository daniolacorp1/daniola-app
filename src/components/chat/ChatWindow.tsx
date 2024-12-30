import { useState, useEffect } from "react";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";

interface Message {
  id: string;
  text: string;
  isAI: boolean;
  timestamp: string;
}

interface NegotiationContext {
  dealId: string;
  title: string;
  price: string;
  supplier: string;
  quantity: string;
}

export const ChatWindow = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    const negotiationContext = sessionStorage.getItem("negotiationContext");
    setIsMounted(true);
    if (negotiationContext) {
      const context: NegotiationContext = JSON.parse(negotiationContext);
      const initialMessage = `Hello! I'd like to discuss the ${context.title} deal (${context.quantity} units at ${context.price}).`;

      // Set initial messages for negotiation
      setMessages([
        {
          id: "1",
          text: `Welcome to the negotiation for ${context.title}. I'm here to help facilitate a professional discussion.`,
          isAI: true,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);

      // Set negotiation suggestions
      setSuggestions([
        `I appreciate the current offer. Could we discuss the possibility of [specific term] adjustment?`,
        `Based on market conditions, would you consider [proposed change]?`,
        `What flexibility do you have regarding payment terms?`,
        `Can we explore volume-based pricing options?`,
      ]);

      // Clear the context after using it
      sessionStorage.removeItem("negotiationContext");
    } else {
      // Default welcome message for non-negotiation chats
      setMessages([
        {
          id: "1",
          text: "Hello! I'm Elliott, your AI assistant. How can I help you with commodity trading today?",
          isAI: true,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    }
  }, []);

  const handleSendMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isAI: false,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, newMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text:
          suggestions.length > 0
            ? "Here's a suggestion for your negotiation: " +
              suggestions[Math.floor(Math.random() * suggestions.length)]
            : "I'll help you with that request. What specific details would you like to know?",
        isAI: true,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  const handleStartVoice = () => {
    console.log("Starting voice recognition...");
  };

  return (
    <div className="flex flex-col h-full w-full ">
      <div className="flex-1 overflow-y-scroll pb-24">
        <h2 className="text-sm font-semibold py-4 text-[#A14545]">Today</h2>
        <div className="space-y-4 text-wrap">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message.text}
              isAI={message.isAI}
              timestamp={message.timestamp}
            />
          ))}
        </div>
      </div>
      {isMounted && (
        <ChatInput
          onSendMessage={handleSendMessage}
          onStartVoice={handleStartVoice}
        />
      )}
    </div>
  );
};
