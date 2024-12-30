import { Mic } from "lucide-react";
import { QuickActionButton } from "./QuickActionButton";
import { useToast } from "../ui/use-toast";
import { useNavigate } from "react-router-dom";

export const VoiceSearchButton = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window)) {
      toast({
        title: "Voice Search Not Available",
        description: "Your browser doesn't support voice recognition.",
        variant: "destructive",
      });
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      toast({
        title: "Listening...",
        description: "Please speak your search query.",
      });
    };

    recognition.onerror = (event: any) => {
      toast({
        title: "Error",
        description: "There was an error with the voice recognition.",
        variant: "destructive",
      });
      console.error('Speech recognition error:', event.error);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      toast({
        title: "Search Query",
        description: `Searching for: "${transcript}"`,
      });
      
      navigate(`/marketplace?search=${encodeURIComponent(transcript)}`);
    };

    recognition.start();
  };

  return (
    <QuickActionButton
      icon={Mic}
      label="Voice Search"
      onClick={handleVoiceSearch}
      className="col-span-2 bg-primary-light hover:bg-primary-light/90 text-gray-800"
      iconClassName="text-gray-800"
    />
  );
};