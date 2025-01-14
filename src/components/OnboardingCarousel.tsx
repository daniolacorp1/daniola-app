import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, Store, Handshake } from "lucide-react";

const slides = [
  {
    title: "AI-Powered Assistant",
    description:
      "Get personalized help with our voice and chat AI assistant. Ask questions, get market insights, and manage your deals effortlessly.",
    Icon: MessageSquare,
  },
  {
    title: "Global Marketplace",
    description:
      "Access a worldwide network of verified suppliers and buyers. Find the best deals and grow your business.",
    Icon: Store,
  },
  {
    title: "Deal Management",
    description:
      "Streamline your deal flow with our powerful tools. Track progress, manage documents, and close deals faster.",
    Icon: Handshake,
  },
];

export const OnboardingCarousel = ({
  onComplete,
}: {
  onComplete: () => void;
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide === slides.length - 1) {
      onComplete();
    } else {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const CurrentIcon = slides[currentSlide].Icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg p-8 space-y-6">
        <div className="flex justify-center">
          <CurrentIcon className="h-16 w-16 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-center">
          {slides[currentSlide].title}
        </h2>
        <p className="text-center text-muted-foreground">
          {slides[currentSlide].description}
        </p>
        <div className="flex justify-between items-center pt-4">
          <div className="flex gap-2">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full ${
                  index === currentSlide
                    ? "bg-primary"
                    : "bg-primary/20"
                }`}
              />
            ))}
          </div>
          <Button onClick={nextSlide}>
            {currentSlide === slides.length - 1 ? "Get Started" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
};