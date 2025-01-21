// src/pages/Auth.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthForm } from '@/components/auth/AuthForm';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  interface AuthValues {
    email: string;
    password: string;
  }

  const handleSubmit = async (values: AuthValues) => {
    setIsLoading(true);
    try {
      // Your authentication logic here
      // Example:
      await signIn(values.email, values.password);
      toast({
        title: "Success!",
        description: "You've been successfully authenticated.",
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Error",
        description: "Authentication failed. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Welcome</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="signin">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="signin">
              <AuthForm
                mode="signin"
                onSubmit={handleSubmit}
                isLoading={isLoading}
              />
            </TabsContent>
            <TabsContent value="signup">
              <AuthForm
                mode="signup"
                onSubmit={handleSubmit}
                isLoading={isLoading}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;

function signIn(_email: string, _password: string) {
  throw new Error('Function not implemented.');
}
