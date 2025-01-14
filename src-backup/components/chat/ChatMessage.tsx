import { Avatar, AvatarImage } from "@/components/ui/avatar";

interface ChatMessageProps {
  message: string;
  isAI: boolean;
  timestamp?: string;
}

export const ChatMessage = ({ message, isAI }: ChatMessageProps) => {
  return (
    <div className="mx-auto text-wrap flex items-end">
      <Avatar
        className={`h-10 w-10 rounded-full z-20 order-${isAI ? "1" : "3"}`}
      >
        <AvatarImage
          src={
            isAI
              ? "/lovable-uploads/1a6d8e53-62f7-496c-98dc-bc95ec3a8f7d.png"
              : "/lovable-uploads/2b403044-7118-457b-a20f-68191960f899.png"
          }
          alt={isAI ? "AI Assistant" : "User"}
        />
      </Avatar>

      <div
        className={`flex  ${
          isAI
            ? "ml-3 mr-auto order-3 flex-col-reverse"
            : "ml-auto mr-3 order-2 flex-col-reverse"
        } `}
      >
        <div
          className={`text-sm text-[#A14545] ${
            isAI ? "text-left order-2" : "text-right order-1"
          }`}
        >
          {isAI ? "AI" : "You"}
        </div>
        <span
          className={`
          ${isAI ? "bg-[#FFF1F1] text-black" : "bg-[#FF4747] text-white"}
          text-[15px] inline-block  rounded-xl p-3 text-left break-all whitespace-pre-wrap`}
        >
          {message}
        </span>
      </div>
    </div>
  );
};
