import { AuthForm } from "@/components/auth/AuthForm";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (credentials: { email: string; password: string }) => {
    sessionStorage.setItem('isAuthenticated', 'true');
    toast({
      title: "Welcome back!",
      description: "Successfully logged in to your account.",
    });
    navigate("/dashboard");
  };

  const handleDemoLogin = (role: string) => {
    sessionStorage.setItem('isAuthenticated', 'true');
    toast({
      title: "Demo Access Granted",
      description: "You now have access to all features.",
    });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-6">
          <img
            src="/lovable-uploads/8a224150-1026-4320-9d88-b1f755e4743f.png"
            alt="Daniola Logo"
            className="w-48 mx-auto" // Updated to match SplashScreen logo size
          />
          <div>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
              Welcome back
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Sign in to access your account
            </p>
          </div>
        </div>

        <AuthForm mode="register" onSubmit={handleLogin} />
        {/* <DemoAccess onDemoLogin={handleDemoLogin} /> */}
      </div>
    </div>
  );
};

export default Auth;