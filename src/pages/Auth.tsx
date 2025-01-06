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

  const handleSubmit = async (data: {
    email: string;
    password: string;
    full_name?: string;
    role?: 'buyer' | 'miner';
  }) => {
    try {
      // Log the attempt
      console.log('Form submission started:', { mode, ...data, password: '***' });

      if (mode === "login") {
        console.log('Attempting login...');
        const { data: authData, error } = await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });

        if (error) throw error;

        console.log('Login successful');
        toast({
          title: "Welcome back!",
          description: "You have successfully logged in.",
        });
        
        navigate('/dashboard');
      } else {
        console.log('Attempting signup...');
        // First, check if Supabase is properly initialized
        console.log('Supabase client check:', !!supabase);

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

        console.log('Signup response:', { signUpData, error: signUpError });

        if (signUpError) {
          console.error('Signup error:', signUpError);
          throw signUpError;
        }

        if (signUpData?.user) {
          console.log('Creating profile...');
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

          if (profileError) {
            console.error('Profile creation error:', profileError);
            throw profileError;
          }

          console.log('Profile created successfully');
          toast({
            title: "Account created successfully!",
            description: "Please check your email to verify your account.",
          });

          // Navigate to a confirmation page
          navigate('/auth/confirm-email');
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
      });
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
          />
        </CardContent>
      </Card>
    </div>
  );
}
