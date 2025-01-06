import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { AuthForm } from "@/components/auth/AuthForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);

      if (mode === "login") {
        const { data: authData, error } = await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });

        if (error) throw error;

        // Get user's role from Supabase
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', authData.user.id)
          .single();

        if (profileError) throw profileError;

        toast({
          title: "Welcome back!",
          description: "You have successfully logged in.",
        });
        
        // Navigate based on user role
        navigate(profile.role === 'buyer' ? '/buyer/dashboard' : '/miner/dashboard');
      } else {
        console.log('Attempting signup with:', { ...data, password: '***' });

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

        console.log('Signup successful:', signUpData);

        if (signUpData?.user) {
          try {
            const { error: profileError } = await supabase
              .from('profiles')
              .insert([
                {
                  id: signUpData.user.id,
                  full_name: data.full_name || '',
                  role: data.role || 'buyer',
                  email: data.email,
                  created_at: new Date().toISOString()
                }
              ])
              .select()
              .single();

            if (profileError) {
              console.error('Profile creation error:', profileError);
              throw profileError;
            }

            toast({
              title: "Account created successfully!",
              description: "Please check your email to verify your account.",
            });

            navigate('/auth/confirm-email');
          } catch (profileError) {
            // If profile creation fails, clean up the auth user
            await supabase.auth.signOut();
            throw profileError;
          }
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
        <CardContent className="pt-6">
          <Tabs value={mode} onValueChange={(value) => setMode(value as "login" | "signup")}>
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <AuthForm 
                mode="login" 
                onSubmit={handleSubmit} 
                onModeChange={setMode} 
                disabled={isSubmitting}
              />
            </TabsContent>
            
            <TabsContent value="signup">
              <AuthForm 
                mode="signup" 
                onSubmit={handleSubmit} 
                onModeChange={setMode}
                disabled={isSubmitting}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
