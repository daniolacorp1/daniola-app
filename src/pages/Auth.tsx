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

  const handleSubmit = async (data: {
    email: string;
    password: string;
    full_name?: string;
    role?: 'buyer' | 'miner';
  }) => {
    try {
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
        console.log('Attempting signup with:', { ...data, password: '***' });

        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email: data.email,
          password: data.password,
        });

        if (signUpError) {
          console.error('Signup error:', signUpError);
          throw signUpError;
        }

        console.log('Signup successful:', signUpData);

        if (signUpData.user) {
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

          toast({
            title: "Account created successfully!",
            description: "Please check your email to verify your account.",
          });

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
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <CardHeader className="px-0">
              <CardTitle>Welcome</CardTitle>
              <CardDescription>
                {mode === "login" 
                  ? "Sign in to your account" 
                  : "Create a new account"}
              </CardDescription>
            </CardHeader>

            <Tabs value={mode} onValueChange={(value) => setMode(value as "login" | "signup")}>
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <AuthForm mode="login" onSubmit={handleSubmit} />
              </TabsContent>
              
              <TabsContent value="signup">
                <AuthForm mode="signup" onSubmit={handleSubmit} />
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
