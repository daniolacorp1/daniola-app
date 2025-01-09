// src/pages/Auth.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { AuthForm } from "@/components/auth/AuthForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AuthMode, AuthFormValues, UserProfile } from "@/types/auth";

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [mode, setMode] = useState<AuthMode>("login");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        if (session) {
          navigate("/dashboard");
        }
      } catch (error) {
        console.error('Session check error:', error);
      }
    };

    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          setLoading(true);
          try {
            // Check if profile exists
            const { data: existingProfile, error: profileError } = await supabase
              .from('profiles')
              .select()
              .eq('id', session.user.id)
              .single();

            if (profileError && profileError.code !== 'PGRST116') {
              throw profileError;
            }

            if (!existingProfile) {
              // Create new profile
              const newProfile: UserProfile = {
                id: session.user.id,
                email: session.user.email || '',
                full_name: session.user.user_metadata.full_name,
                role: session.user.user_metadata.role || 'buyer',
                location: session.user.user_metadata.location || '',
                bio: session.user.user_metadata.bio,
                commodities: session.user.user_metadata.commodities || '',
                company_name: session.user.user_metadata.company_name,
                years_of_experience: session.user.user_metadata.years_of_experience
              };

              const { error: insertError } = await supabase
                .from('profiles')
                .insert(newProfile);

              if (insertError) throw insertError;
            }

            toast({
              title: "Welcome!",
              description: "Successfully signed in.",
            });
            navigate("/dashboard");
          } catch (error) {
            console.error('Error in auth flow:', error);
            toast({
              title: "Error",
              description: error instanceof Error ? error.message : "An error occurred during sign in. Please try again.",
              variant: "destructive",
            });
          } finally {
            setLoading(false);
          }
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, toast]);

  const handleSubmit = async (values: AuthFormValues) => {
    setLoading(true);
    try {
      if (mode === "login") {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: values.email,
          password: values.password,
        });
        
        if (error) throw error;
        
        // If login successful, data.session should exist
        if (!data.session) {
          throw new Error("No session created");
        }
      } else {
        // Signup flow
        if (!values.full_name || !values.role) {
          throw new Error('Full name and role are required for registration');
        }
        
        const { error } = await supabase.auth.signUp({
          email: values.email,
          password: values.password,
          options: {
            data: {
              full_name: values.full_name,
              role: values.role,
              location: values.location,
              bio: values.bio,
              commodities: values.commodities,
              company_name: values.company_name,
              years_of_experience: values.years_of_experience
            },
          },
        });

        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Please check your email to verify your account.",
        });
        
        // Switch to login mode after successful signup
        setMode("login");
      }
    } catch (error) {
      console.error('Auth error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <img
            src="/lovable-uploads/8a224150-1026-4320-9d88-b1f755e4743f.png"
            alt="Logo"
            className="w-48 mx-auto"
          />
        </div>

        <div className="bg-white p-8 rounded-lg shadow space-y-6">
          <Tabs defaultValue="login" onValueChange={(value) => setMode(value as AuthMode)}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login" disabled={loading}>Login</TabsTrigger>
              <TabsTrigger value="signup" disabled={loading}>Register</TabsTrigger>
            </TabsList>
            <TabsContent value="login" className="space-y-4">
              <AuthForm mode="login" onSubmit={handleSubmit} isLoading={loading} />
            </TabsContent>
            <TabsContent value="signup">
              <AuthForm mode="signup" onSubmit={handleSubmit} isLoading={loading} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Auth;