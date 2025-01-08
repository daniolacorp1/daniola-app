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
import ConfirmEmail from "@/pages/ConfirmEmail";
import Container from "./components/container/Container";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'buyer' | 'miner' | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Add a loading state

  useEffect(() => {
    const initializeAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
      if (session?.user) {
        await fetchUserRole(session.user.id);
      }
      setIsLoading(false); // Stop loading once auth is initialized
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setIsAuthenticated(!!session);
      if (session?.user) {
        await fetchUserRole(session.user.id);
      } else {
        setUserRole(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserRole = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single();

      if (error) {
        console.error("Error fetching user role:", error);
        return;
      }
      setUserRole(data?.role || null);
    } catch (err) {
      console.error("Unexpected error fetching user role:", err);
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
            isLoading ? (
              <div>Loading...</div>
            ) : isAuthenticated && userRole === 'buyer' ? (
              <Container><Dashboard /></Container>
            ) : (
              <Navigate to="/auth" />
            )
          }
        />
        <Route
          path="/miner/dashboard"
          element={
            isLoading ? (
              <div>Loading...</div>
            ) : isAuthenticated && userRole === 'miner' ? (
              <Container><Dashboard /></Container>
            ) : (
              <Navigate to="/auth" />
            )
          }
        />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
