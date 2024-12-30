import { ArrowLeft, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface CopperHeaderProps {
  isSaved: boolean;
  onSave: () => void;
}

export const CopperHeader = ({ isSaved, onSave }: CopperHeaderProps) => {
  const navigate = useNavigate();
  
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold text-gray-900">Copper Cathodes</h1>
        </div>
        <Button 
          variant="ghost" 
          size="icon"
          className="rounded-full"
          onClick={onSave}
        >
          <Heart className={`h-5 w-5 ${isSaved ? 'fill-red-500 text-red-500' : ''}`} />
        </Button>
      </div>
    </header>
  );
};