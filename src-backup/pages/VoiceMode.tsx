import { Mic } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BottomNav } from "@/components/BottomNav";
import { MainHeader } from "@/components/MainHeader";

const VoiceMode = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background pb-20">
      <MainHeader />
      <div className="pt-[60px]">
        <header className="sticky top-[60px] bg-white border-b border-gray-200 px-4 py-3">
          <h1 className="text-xl font-semibold">Voice Mode</h1>
        </header>

        <main className="flex flex-col items-center justify-center min-h-[80vh]">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative"
          >
            <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping" />
            <Button
              size="lg"
              className="h-24 w-24 rounded-full"
            >
              <Mic className="h-8 w-8" />
            </Button>
          </motion.div>
          <p className="mt-8 text-center text-muted-foreground">
            Tap the microphone to start using voice commands
          </p>
        </main>

        <BottomNav />
      </div>
    </div>
  );
};

export default VoiceMode;
