// src/pages/Auth.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { AuthForm } from "@/components/auth/AuthForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AuthMode, AuthFormValues } from "@/types/auth";
import { Input } from "@/components/ui/input";

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [mode, setMode] = useState<AuthMode>("login");
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // Safety timeout to prevent stuck loading state
  useEffect(() => {
    if (loading) {
      const timeout = setTimeout(() => {
        setLoading(false);
      }, 10000); // Reset after 10 seconds

      return () => clearTimeout(timeout);
    }
  }, [loading]);

  const handleSubmit = async (values: AuthFormValues) => {
    try {
      setLoading(true);

      if (mode === "login") {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: values.email,
          password: values.password,
        });
        
        if (error) {
          throw error;
        }
        
        if (data.session) {
          // Create or update profile
          const { error: profileError } = await supabase
            .from('profiles')
            .upsert({
              id: data.session.user.id,
              email: data.session.user.email,
              full_name: data.session.user.user_metadata.full_name,
              role: data.session.user.user_metadata.role || 'buyer',
              updated_at: new Date().toISOString(),
            }, { onConflict: 'id' });

          if (profileError) {
            console.error('Profile update error:', profileError);
          }

          toast({
            title: "Welcome back!",
            description: "Successfully signed in.",
          });
          
          navigate("/dashboard");
        }
      } else {
        if (!values.full_name || !values.role) {
          throw new Error('Full name and role are required for registration');
        }
        
        const { data, error } = await supabase.auth.signUp({
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

        if (data.user) {
          toast({
            title: "Success",
            description: "Please check your email to verify your account.",
          });
          setMode("login");
        }
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
      e.preventDefault();
      const email = ""; // Initialize email
      const password = ""; // Initialize password
      try {
        const { data: { user }, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });
  
        if (signUpError) throw signUpError;
  
        if (user) {
          // Create profile for the new user
          const { error: profileError } = await supabase
            .from('profiles')
            .insert([
              {
                id: user.id,
                first_name: firstName,
                last_name: lastName,
                updated_at: new Date().toISOString(),
              },
            ]);
  
          if (profileError) throw profileError;
        }
      } catch (error) {
        console.error('Error signing up:', error);
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
              <form onSubmit={handleSignUp}>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                    <Input
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>
                  {/* ... other form fields */}
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Auth;