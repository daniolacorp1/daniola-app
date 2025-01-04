import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { AuthForm } from "@/components/auth/AuthForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AuthMode } from "@/types/auth";

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [mode, setMode] = useState<AuthMode>("login");

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/dashboard");
      }
    };

    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN') {
          try {
            // Check if profile exists
            const { data: existingProfile } = await supabase
              .from('profiles')
              .select()
              .eq('id', session?.user.id)
              .single();

            if (!existingProfile) {
              // Create new profile
              const { error: insertError } = await supabase
                .from('profiles')
                .insert({
                  id: session?.user.id,
                  email: session?.user.email,
                  full_name: session?.user.user_metadata.full_name,
                  role: session?.user.user_metadata.role || 'buyer',
                });

              if (insertError) {
                console.error('Error creating profile:', insertError);
                toast({
                  title: "Error",
                  description: "Failed to create user profile. Please try again.",
                  variant: "destructive",
                });
                return;
              }
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
              description: "An error occurred during sign in. Please try again.",
              variant: "destructive",
            });
          }
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, toast]);

  const handleSubmit = async (values: any) => {
    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({
          email: values.email,
          password: values.password,
        });
        if (error) throw error;
      } else {
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
        else {
          toast({
            title: "Success",
            description: "Please check your email to verify your account.",
          });
        }
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
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
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Register</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <AuthForm mode="login" onSubmit={handleSubmit} />
            </TabsContent>
            <TabsContent value="signup">
              <AuthForm mode="signup" onSubmit={handleSubmit} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Auth;
