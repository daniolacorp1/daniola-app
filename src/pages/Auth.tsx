import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { AuthForm } from "@/components/auth/AuthForm";
import { supabase } from "@/lib/supabase";

export default function Auth() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [role, setRole] = useState<"buyer" | "miner">("buyer");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: {
    email: string;
    password: string;
    full_name?: string;
  }) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      if (mode === "login") {
        const { data: authData, error } = await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });

        if (error) throw error;
        navigate(`/${role}/dashboard`);
      } else {
        const { data: signUpData, error } = await supabase.auth.signUp({
          email: data.email,
          password: data.password,
          options: { data: { full_name: data.full_name, role } }
        });

        if (error) throw error;
        if (signUpData?.user) {
          await supabase.from('profiles').insert({
            id: signUpData.user.id,
            email: data.email,
            full_name: data.full_name,
            role,
            created_at: new Date().toISOString()
          });
          navigate('/auth/confirm-email');
        }
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Daniola</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={mode} onValueChange={(value) => setMode(value as "login" | "signup")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <AuthForm mode="login" onSubmit={handleSubmit} disabled={isSubmitting} />
            </TabsContent>

            <TabsContent value="signup">
              <div className="space-y-4">
                <Select value={role} onValueChange={(value) => setRole(value as "buyer" | "miner")}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="buyer">Buyer</SelectItem>
                    <SelectItem value="miner">Miner</SelectItem>
                  </SelectContent>
                </Select>
                <AuthForm mode="signup" onSubmit={handleSubmit} disabled={isSubmitting} />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
