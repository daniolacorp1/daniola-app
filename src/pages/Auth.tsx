import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { AuthForm } from "@/components/auth/AuthForm";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";

export default function Auth() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: {
    email: string;
    password: string;
    full_name?: string;
    role?: 'buyer' | 'miner';
  }) => {
    if (isSubmitting) return; // Prevent multiple submissions

    try {
      setIsSubmitting(true);

      if (mode === "login") {
        const { data: authData, error } = await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });

        if (error) throw error;

        toast({
          title: "Welcome back!",
          description: "You have successfully logged in.",
        });
        
        navigate('/dashboard');
      } else {
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email: data.email,
          password: data.password,
          options: {
            data: {
              full_name: data.full_name,
              role: data.role,
            },
          },
        });

        if (signUpError) {
          // Check if it's a rate limit error
          if (signUpError.message.includes('security purposes')) {
            toast({
              variant: "destructive",
              title: "Please wait",
              description: "For security reasons, please wait a moment before trying again.",
            });
            return;
          }
          throw signUpError;
        }

        if (signUpData?.user) {
          const { error: profileError } = await supabase
            .from('profiles')
            .insert([
              {
                id: signUpData.user.id,
                full_name: data.full_name || '',
                role: data.role || 'buyer',
                email: data.email
              }
            ]);

          if (profileError) throw profileError;

          toast({
            title: "Account created successfully!",
            description: "Please check your email to verify your account.",
          });

          // Navigate to confirmation page
          navigate('/auth/confirm-email');
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error 
          ? error.message 
          : "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
      // Add a slight delay before allowing another submission
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  };

  return (
    <div className="container mx-auto py-10">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Daniola</CardTitle>
          <CardDescription>
            {mode === "login" 
              ? "Sign in to your account" 
              : "Create a new account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AuthForm 
            mode={mode} 
            onSubmit={handleSubmit} 
            onModeChange={setMode}
            disabled={isSubmitting}
          />
        </CardContent>
      </Card>
    </div>
  );
}
