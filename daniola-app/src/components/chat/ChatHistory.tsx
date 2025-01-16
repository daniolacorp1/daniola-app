import { Archive, MessageSquare, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatHistoryItem {
  id: string;
  title: string;
  timestamp: string;
}

interface ChatHistoryProps {
  chats: ChatHistoryItem[];
  onSelectChat: (id: string) => void;
  onArchiveChat: (id: string) => void;
  onDeleteChat: (id: string) => void;
}

export const ChatHistory = ({
  chats,
  onSelectChat,
  onArchiveChat,
  onDeleteChat,
}: ChatHistoryProps) => {
  return (
    <div className="w-full md:w-64 h-full border-r border-gray-200 bg-white">
      <div className="p-4 border-b border-gray-200">
        <h2 className="font-semibold text-gray-800">Chat History</h2>
      </div>
      <div className="overflow-y-auto h-[calc(100vh-64px)]">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className="p-3 border-b border-gray-100 hover:bg-gray-50 flex items-center justify-between group"
          >
            <button
              onClick={() => onSelectChat(chat.id)}
              className="flex items-center gap-2 text-left flex-1"
            >
              <MessageSquare className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-700 truncate">
                  {chat.title}
                </p>
                <p className="text-xs text-gray-500">{chat.timestamp}</p>
              </div>
            </button>
            <div className="hidden group-hover:flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => onArchiveChat(chat.id)}
              >
                <Archive className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-red-500 hover:text-red-600"
                onClick={() => onDeleteChat(chat.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};