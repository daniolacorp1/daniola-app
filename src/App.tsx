// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { Loading } from '@/components/ui/loading';
import { SplashScreen } from '@/components/SplashScreen';
import { Toaster } from '@/components/ui/toaster';

// Page imports
import Auth from '@/pages/Auth';
import Dashboard from '@/pages/Dashboard';
import Profile from '@/pages/Profile.tsx';
import BuyerProfile from '@/pages/buyer-profile';
import SupplierProfile from '@/pages/supplier-profile';
import Chat from '@/pages/Chat';
import ChatHistory from '@/pages/ChatHistory';
import CommoditiesChat from '@/pages/CommoditiesChat';
import ConfirmEmail from '@/pages/ConfirmEmail';
import CopperDetail from '@/pages/CopperDetail';
import DealCreate from '@/pages/DealCreate';
import DealDetail from '@/pages/DealDetail';
import DealDetailView from '@/pages/DealDetailView';
import Deals from '@/pages/Deals';
import Marketplace from '@/pages/Marketplace';
import Notifications from '@/pages/Notifications';
import SavedListings from '@/pages/SavedListings';
import Settings from '@/pages/Settings';
import VoiceMode from '@/pages/VoiceMode';

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setIsAuthenticated(!!session);
      } catch (error) {
        console.error('Auth check error:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

// Route wrapper for animations
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route path="/" element={<Auth />} />
        <Route path="/confirm-email" element={<ConfirmEmail />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        
        {/* Profile Routes */}
        <Route path="/buyer-profile" element={
          <ProtectedRoute>
            <BuyerProfile />
          </ProtectedRoute>
        } />
        <Route path="/supplier-profile" element={
          <ProtectedRoute>
            <SupplierProfile />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />

        {/* Chat Routes */}
        <Route path="/chat" element={
          <ProtectedRoute>
            <Chat />
          </ProtectedRoute>
        } />
        <Route path="/chat-history" element={
          <ProtectedRoute>
            <ChatHistory />
          </ProtectedRoute>
        } />
        <Route path="/commodities-chat" element={
          <ProtectedRoute>
            <CommoditiesChat />
          </ProtectedRoute>
        } />
        <Route path="/voice-mode" element={
          <ProtectedRoute>
            <VoiceMode />
          </ProtectedRoute>
        } />

        {/* Marketplace and Deals */}
        <Route path="/marketplace" element={
          <ProtectedRoute>
            <Marketplace />
          </ProtectedRoute>
        } />
        <Route path="/copper-detail" element={
          <ProtectedRoute>
            <CopperDetail />
          </ProtectedRoute>
        } />
        <Route path="/deals" element={
          <ProtectedRoute>
            <Deals />
          </ProtectedRoute>
        } />
        <Route path="/deal-create" element={
          <ProtectedRoute>
            <DealCreate />
          </ProtectedRoute>
        } />
        <Route path="/deal-detail" element={
          <ProtectedRoute>
            <DealDetail />
          </ProtectedRoute>
        } />
        <Route path="/deal-detail-view" element={
          <ProtectedRoute>
            <DealDetailView />
          </ProtectedRoute>
        } />
        <Route path="/saved-listings" element={
          <ProtectedRoute>
            <SavedListings />
          </ProtectedRoute>
        } />

        {/* Other Routes */}
        <Route path="/notifications" element={
          <ProtectedRoute>
            <Notifications />
          </ProtectedRoute>
        } />
        <Route path="/settings" element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        } />

        {/* Catch all route - redirect to auth */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsInitialized(true);
      if (session) {
        setShowSplash(true);
      }
    };
    
    checkSession();
  }, []);

  if (!isInitialized) {
    return <Loading />;
  }

  if (showSplash) {
    return (
      <SplashScreen
        onComplete={() => {
          setShowSplash(false);
        }}
      />
    );
  }

  return (
    <Router>
      <AnimatedRoutes />
      <Toaster />
    </Router>
  );
}

export default App;