// components/auth/AuthForm.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AuthMode, AuthFormValues, AuthFormProps } from "@/types/auth";
import { Mail, Lock, User } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  })
});

const signupSchema = loginSchema.extend({
  full_name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  role: z.enum(['buyer', 'supplier'], {
    required_error: "Please select a role.",
  })
});

export const AuthForm = ({ mode, onSubmit, isLoading }: AuthFormProps) => {
  const schema = mode === 'login' ? loginSchema : signupSchema;
  
  const form = useForm<AuthFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      full_name: "",
      role: undefined,
    },
  });

  const handleSubmit = async (values: AuthFormValues) => {
    await onSubmit(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="text-left">
              <FormLabel className="text-sm font-medium text-gray-700">
                Email
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="you@example.com"
                    className="pl-10"
                    {...field}
                    disabled={isLoading}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="text-left">
              <FormLabel className="text-sm font-medium text-gray-700">
                Password
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    type="password"
                    className="pl-10"
                    {...field}
                    disabled={isLoading}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {mode === 'signup' && (
          <>
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem className="text-left">
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Full Name
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        placeholder="John Doe"
                        className="pl-10"
                        {...field}
                        disabled={isLoading}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="text-left">
                  <FormLabel className="text-sm font-medium text-gray-700">
                    Role
                  </FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                    disabled={isLoading}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="buyer">Buyer</SelectItem>
                      <SelectItem value="supplier">Supplier</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        <Button
          type="submit"
          className="w-full h-11 bg-[#F2E2E2] hover:bg-[#F2E2E2]/90"
          disabled={isLoading}
        >
          {isLoading ? "Please wait..." : mode === "login" ? "Sign In" : "Create Account"}
        </Button>
      </form>
    </Form>
  );
};
