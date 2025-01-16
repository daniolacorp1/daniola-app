import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SplashScreen } from "@/components/SplashScreen";
import { AnimatePresence } from "framer-motion";

const Index = () => {
  const navigate = useNavigate();
  const [showSplash, setShowSplash] = useState(true);
  const isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true';

  const handleSplashComplete = () => {
    setShowSplash(false);
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/auth");
    }
  };

  useEffect(() => {
    // Preload any necessary assets here
    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {showSplash && (
        <SplashScreen onComplete={handleSplashComplete} />
      )}
    </AnimatePresence>
  );
};

export default Index;
