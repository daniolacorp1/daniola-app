import { ChatWindow } from "@/components/chat/ChatWindow";
import { useIsMobile } from "@/hooks/use-mobile";
import { ArrowLeft, Paperclip } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [showSidebar, setShowSidebar] = useState(!isMobile);
  const [chats] = useState([
    {
      id: "1",
      title: "Negotiating with Buyer B",
      timestamp: "2 hours ago",
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
    console.log("Select chat:", id);
    if (isMobile) {
      setShowSidebar(false);
    }
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="h-screen flex flex-col">
      {/* {
        <div className={`${showSidebar ? "block" : "hidden"}`}>
          <MainHeader />
        </div>
      } */}
      <div className="flex flex-1">
        <div className="flex-1 flex flex-col h-full relative">
          <header className="flex items-end justify-between top-[60px] z-40">
            <div className="flex items-center gap-3">
              {/* {isMobile && !showSidebar && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleSidebar}
                  className="md:hidden"
                >
                  <PanelLeftOpen className="h-5 w-5" />
                </Button>
              )} */}
              {/* {isMobile && showSidebar && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleSidebar}
                  className="md:hidden"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              )} */}
              <div className="text-lg flex gap-2 font-bold pt-[1rem]">
                <button onClick={() => navigate("/chats")}>
                  <ArrowLeft className="w-5 h-5" />
                </button>
                Negotiating with Buyer B
              </div>
            </div>
            <div className="flex items-end">
              <span className="text-[#A14545] p-1 hover:opacity-80">
                <Paperclip className="h-5 w-5" />
              </span>
              {/* <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-gray-500">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => navigate("/")}>
                    Home
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/marketplace")}>
                    Marketplace
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/deals")}>
                    Deals
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/settings")}>
                    Settings
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu> */}
            </div>
          </header>
          <div className="flex-1 overflow-hidden relative">
            <ChatWindow />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
