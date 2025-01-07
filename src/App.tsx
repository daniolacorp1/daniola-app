import { useState, useEffect } from "react";
import {
 BrowserRouter as Router,
 Routes,
 Route,
 Navigate,
} from "react-router-dom";
import { supabase } from "@/lib/supabase";
import Index from "@/pages/Index";
import Auth from "@/pages/Auth";
import Dashboard from "@/pages/Dashboard";
import Marketplace from "@/pages/Marketplace";
import Chat from "@/pages/Chat";
import CopperDetail from "@/pages/CopperDetail";
import Deals from "@/pages/Deals";
import DealDetailView from "@/pages/DealDetailView";
import DealDetail from "@/pages/DealDetail";
import SavedListings from "@/pages/SavedListings";
import Notifications from "@/pages/Notifications";
import Settings from "@/pages/Settings";
import VoiceMode from "@/pages/VoiceMode";
import Profile from "@/pages/Profile";
import CommoditiesChat from "@/pages/CommoditiesChat";
import Container from "./components/container/Container";
import Chats from "./pages/ChatHistory";
import BuyerProfile from "./pages/buyer-profile";
import SupplierProfile from "./pages/supplier-profile";
import ConfirmEmail from "@/pages/ConfirmEmail";

function App() {
 const [isAuthenticated, setIsAuthenticated] = useState(false);
 const [userRole, setUserRole] = useState<'buyer' | 'miner' | null>(null);
 
 useEffect(() => {
   // Check initial session
   supabase.auth.getSession().then(({ data: { session } }) => {
     setIsAuthenticated(!!session);
     if (session?.user) {
       fetchUserRole(session.user.id);
     }
   });

   // Listen for auth changes
   const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
     setIsAuthenticated(!!session);
     if (session?.user) {
       fetchUserRole(session.user.id);
     } else {
       setUserRole(null);
     }
   });

   return () => subscription.unsubscribe();
 }, []);

 const fetchUserRole = async (userId: string) => {
   const { data, error } = await supabase
     .from('profiles')
     .select('role')
     .eq('id', userId)
     .single();
   
   if (data?.role) {
     setUserRole(data.role);
   }
 };

 return (
   <Router>
     <Routes>
       {/* Public routes */}
       <Route path="/" element={<Index />} />
       <Route path="/auth" element={<Auth />} />
       <Route path="/auth/confirm-email" element={<ConfirmEmail />} />

       {/* Role-specific dashboard routes */}
       <Route
         path="/buyer/dashboard"
         element={
           isAuthenticated && userRole === 'buyer' 
             ? <Container><Dashboard /></Container> 
             : <Navigate to="/auth" />
         }
       />
       <Route
         path="/miner/dashboard"
         element={
           isAuthenticated && userRole === 'miner' 
             ? <Container><Dashboard /></Container> 
             : <Navigate to="/auth" />
         }
       />

       {/* Protected routes */}
       <Route
         path="/marketplace"
         element={isAuthenticated ? <Container><Marketplace /></Container> : <Navigate to="/auth" />}
       />
       <Route
         path="/chat"
         element={isAuthenticated ? <Chat /> : <Navigate to="/auth" />}
       />
       <Route 
         path="/buyer-profile"
         element={isAuthenticated ? <BuyerProfile /> : <Navigate to="/auth" />}
       />
       <Route 
         path="/supplier-profile"
         element={isAuthenticated ? <SupplierProfile /> : <Navigate to="/auth" />}
       />
       <Route
         path="/chats"
         element={isAuthenticated ? <Chats /> : <Navigate to="/auth" />}
       />
       <Route
         path="/commodities-chat"
         element={isAuthenticated ? <CommoditiesChat /> : <Navigate to="/auth" />}
       />
       <Route
         path="/copper"
         element={isAuthenticated ? <Container><CopperDetail /></Container> : <Navigate to="/auth" />}
       />
       <Route
         path="/deals"
         element={isAuthenticated ? <Container><Deals /></Container> : <Navigate to="/auth" />}
       />
       <Route
         path="/deals/:id"
         element={isAuthenticated ? <Container><DealDetailView /></Container> : <Navigate to="/auth" />}
       />
       <Route
         path="/deals/:id/details"
         element={isAuthenticated ? <Container><DealDetail /></Container> : <Navigate to="/auth" />}
       />
       <Route
         path="/saved"
         element={isAuthenticated ? <Container><SavedListings /></Container> : <Navigate to="/auth" />}
       />
       <Route
         path="/notifications"
         element={isAuthenticated ? <Container><Notifications /></Container> : <Navigate to="/auth" />}
       />
       <Route
         path="/settings"
         element={isAuthenticated ? <Container><Settings /></Container> : <Navigate to="/auth" />}
       />
       <Route
         path="/voice"
         element={isAuthenticated ? <Container><VoiceMode /></Container> : <Navigate to="/auth" />}
       />
       <Route
         path="/profile"
         element={isAuthenticated ? <Container><Profile /></Container> : <Navigate to="/auth" />}
       />

       {/* Fallback route */}
       <Route path="*" element={<Navigate to="/" />} />
     </Routes>
   </Router>
 );
}

export default App;
