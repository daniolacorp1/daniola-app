import { useState } from "react";
import { Mic, Plus } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Input } from "../ui/input";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  onStartVoice?: () => void;
}

export const ChatInput = ({ onSendMessage, onStartVoice }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-0 px-4 bg-white left-0 right-0 py-3 z-[60]">
      <div className=" mx-auto">
        <div className="flex items-center justify-between gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src="/lovable-uploads/1a6d8e53-62f7-496c-98dc-bc95ec3a8f7d.png"
              alt="AI Assistant"
            />
          </Avatar>
          <div className="flex items-center w-full  bg-[#FFF1F1] rounded-xl justify-evenly px-3 "> 
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1 bg-transparent outline-none placeholder:text-[#A14545] py-3  text-[15px]"
            />
            <div className="flex items-center gap-2">
              <button
                onClick={onStartVoice}
                className="text-[#A14545] p-1 hover:opacity-80"
              >
                <Mic className="h-5 w-5" />
              </button>
              <button className="text-[#A14545] p-1 hover:opacity-80">
                <Plus className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
