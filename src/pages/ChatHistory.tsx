import { ChatHistory } from "@/components/chat/ChatHistory";
import { MainHeader } from "@/components/MainHeader";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Chats = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [showSidebar, setShowSidebar] = useState(!isMobile);
  const [chats] = useState([
    {
      id: "1",
      title: "Negotiating with Buyer B",
      timestamp: "2 hours ago",
      isChat: true,
    },
    {
      id: "2",
      title: "Copper price discussion",
      timestamp: "Yesterday",
      isCommodityChat: true,
    },
  ]);

  const handleArchiveChat = (id: string) => {
    console.log("Archive chat:", id);
  };

  const handleDeleteChat = (id: string) => {
    console.log("Delete chat:", id);
  };

  const handleSelectChat = (id: string) => {
    const selectedChat = chats.find((chat) => chat.id === id);
    if (selectedChat?.isCommodityChat) {
      navigate("/commodities-chat");
      return;
    }
    if(selectedChat?.isChat){
      navigate("/chat");
      return;
    }
    console.log("Select chat:", id);
    if (isMobile) {
      setShowSidebar(false);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {
        <div className={`${showSidebar ? "block" : "hidden"}`}>
          <MainHeader />
        </div>
      }
      <div className="flex flex-1">
        <div
          className={`${
            showSidebar ? "block" : "hidden"
          } md:block w-full md:w-64 flex-shrink-0 fixed md:relative left-0 top-[60px] bottom-0 bg-white z-50`}
        >
          <ChatHistory
            chats={chats}
            onSelectChat={handleSelectChat}
            onArchiveChat={handleArchiveChat}
            onDeleteChat={handleDeleteChat}
          />
        </div>
      </div>
    </div>
  );
};

export default Chats;
