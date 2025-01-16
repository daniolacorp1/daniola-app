import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const CopperSupplier = () => {
  const navigate = useNavigate();
  
  return (
    <div className="mt-8 bg-white p-4 rounded-xl shadow-sm">
      <div className="flex items-center gap-4">
        <img
          src="/lovable-uploads/2b403044-7118-457b-a20f-68191960f899.png"
          alt="James Lee"
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <div className="font-semibold text-gray-900">James Lee</div>
          <div className="text-gray-500 text-sm">JL Trading Group</div>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="ml-auto rounded-full"
          onClick={() => navigate('/chat')}
        >
          <MessageSquare className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};