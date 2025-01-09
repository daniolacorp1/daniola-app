import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { AuthForm } from "@/components/auth/AuthForm";
import { DemoAccess } from "@/components/auth/DemoAccess";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AuthMode } from "@/types/auth";

// Define types for form values
interface AuthFormValues {
  email: string;
  password: string;
  full_name?: string;
  role?: 'buyer' | 'supplier';
}

interface Profile {
  id: string;
  email: string;
  full_name?: string;
  role: 'buyer' | 'supplier';
}

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

            if (profileError && profileError.code !== 'PGRST116') { // PGRST116 is "not found" error
              throw profileError;
            }

            if (!existingProfile) {
              // Create new profile
              const newProfile: Profile = {
                id: session.user.id,
                email: session.user.email || '',
                full_name: session.user.user_metadata.full_name,
                role: session.user.user_metadata.role || 'buyer',
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
          } catch (error: any) {
            console.error('Error in auth flow:', error);
            toast({
              title: "Error",
              description: error.message || "An error occurred during sign in. Please try again.",
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
        const { error } = await supabase.auth.signInWithPassword({
          email: values.email,
          password: values.password,
        });
        if (error) throw error;
      } else {
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
            },
          },
        });
        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Please check your email to verify your account.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (role: 'buyer' | 'supplier') => {
    setLoading(true);
    try {
      const email = role === 'buyer' ? 'demo.buyer@example.com' : 'demo.supplier@example.com';
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password: 'demo123456',
      });
      if (error) throw error;
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
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
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-muted-foreground">
                    Or try a demo account
                  </span>
                </div>
              </div>
              <DemoAccess onDemoLogin={handleDemoLogin} isLoading={loading} />
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
