import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { AuthForm } from "@/components/auth/AuthForm";
import { DemoAccess } from "@/components/auth/DemoAccess";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

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
        // Add your login logic here
        console.log("Login data:", data);
      } else {
        // Add your signup logic here
        console.log("Signup data:", data);
      }
      
      // On success:
      toast({
        title: mode === "login" ? "Welcome back!" : "Account created!",
        description: mode === "login" 
          ? "You have successfully logged in." 
          : "Your account has been created successfully.",
      });
      navigate("/dashboard");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className="container mx-auto py-10">
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="pt-6">
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
          
          <div className="mt-6">
            <DemoAccess />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
