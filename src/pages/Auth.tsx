// Auth.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { AuthForm } from "@/components/auth/AuthForm";
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
   setIsSubmitting(true);

   try {
     if (mode === "login") {
       const { data: authData, error } = await supabase.auth.signInWithPassword({
         email: data.email,
         password: data.password,
       });

       if (error) throw error;

       const { data: profile } = await supabase
         .from('profiles')
         .select('role')
         .eq('id', authData.user.id)
         .single();

       toast({ title: "Logged in successfully!" });
       navigate(profile.role === 'buyer' ? '/buyer/dashboard' : '/miner/dashboard');

     } else {
       const { data: signUpData, error } = await supabase.auth.signUp({
         email: data.email,
         password: data.password,
         options: {
           data: { full_name: data.full_name, role: data.role }
         }
       });

       if (error) throw error;

       if (signUpData?.user) {
         await supabase.from('profiles').insert({
           id: signUpData.user.id,
           email: data.email,
           full_name: data.full_name,
           role: data.role,
           created_at: new Date().toISOString()
         });

         toast({ title: "Account created! Check email for confirmation." });
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
   <div className="container max-w-md mx-auto py-10">
     <AuthForm
       mode={mode}
       onSubmit={handleSubmit}
       onModeChange={setMode}
       disabled={isSubmitting}
     />
   </div>
 );
}
