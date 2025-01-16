import React from "react";
import { Message } from "@/types/chat";
import { Avatar } from "@/components/ui/avatar";

interface ChatMessagesProps {
  messages: Message[];
}

export const ChatMessages = ({ messages }: ChatMessagesProps) => {
  return (
    <div className="flex-1">
      <h1 className="text-xl font-bold text-center pt-[1rem]">Commodities</h1>
      <div className="flex items-start">
        <h2 className="text-black py-4">Copper price discussion</h2>
      </div>
      <div>
        <div className=" overflow-y-scroll mx-auto space-y-5 py-4">
          {messages.map((message) => (
            <div key={message.id} className="flex flex-col gap-1">
              <div className={`flex items-start gap-2 `}>
                <Avatar className="h-10 w-10 shrink-0 mt-auto">
                  <img
                    src={
                      message.sender === "assistant"
                        ? "/lovable-uploads/1a6d8e53-62f7-496c-98dc-bc95ec3a8f7d.png"
                        : "/lovable-uploads/2b403044-7118-457b-a20f-68191960f899.png"
                    }
                    alt={
                      message.sender === "assistant" ? "AI Assistant" : "User"
                    }
                    className="h-full w-full object-cover rounded-full"
                  />
                </Avatar>
                <div className={`flex "ml-auto mr-3 order-2 flex-col-reverse `}>
                  <div
                    className={`text-sm text-[#A14545] ${
                      message.sender === "assistant"
                        ? "text-left order-2"
                        : "text-right order-1"
                    }`}
                  >
                    {message.sender === "assistant" ? (
                      "Elliott"
                    ) : (
                      <span className="text-black font-bold">You</span>
                    )}{" "}
                    {message.sender !== "assistant" && (
                      <span className="text-xs font-normal text-[#A14545]">
                        {message.time}
                      </span>
                    )}
                  </div>
                  <span
                    className={`${
                      message.sender === "assistant"
                        ? "bg-[#FFF1F1] text-black p-3"
                        : "   text-black "
                    } text-[15px] inline-block rounded-xl  text-left break-all whitespace-pre-wrap`}
                  >
                    {message.text}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
