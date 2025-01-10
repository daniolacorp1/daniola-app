// src/components/auth/AuthForm.tsx
import { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { AuthMode, AuthFormValues } from "@/types/auth";
import { Mail, Lock, User, MapPin, Building } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

const signupSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  full_name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  role: z.enum(["buyer", "supplier"], {
    required_error: "Please select your role.",
  }),
  location: z.string().min(2, {
    message: "Please enter your location.",
  }),
  bio: z.string().optional(),
  commodities: z.string().min(2, {
    message: "Please enter your commodities of interest.",
  }),
  company_name: z.string().optional(),
  years_of_experience: z.number().optional(),
});

interface AuthFormProps {
  mode: AuthMode;
  onSubmit: (values: AuthFormValues) => Promise<void>;
  isLoading: boolean;
}

export const AuthForm = ({ mode, onSubmit, isLoading }: AuthFormProps) => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  
  const form = useForm<AuthFormValues>({
    resolver: zodResolver(mode === "login" ? loginSchema : signupSchema),
    defaultValues: {
      email: "",
      password: "",
      full_name: "",
      role: undefined,
      location: "",
      bio: "",
      commodities: "",
      company_name: "",
      years_of_experience: 0,
    },
  });

  const handleSubmit = async (values: AuthFormValues) => {
    try {
      await onSubmit(values);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input placeholder="you@example.com" className="pl-10" {...field} />
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
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input type="password" className="pl-10" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {mode === "signup" && (
          <>
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input placeholder="John Doe" className="pl-10" {...field} />
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
                <FormItem>
                  <FormLabel>I am a</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      setSelectedRole(value);
                    }}
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

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input placeholder="City, Country" className="pl-10" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="commodities"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Commodities of Interest</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Fresh produce, nuts, dairy"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {selectedRole === "supplier" && (
              <>
                <FormField
                  control={form.control}
                  name="company_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Building className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <Input placeholder="Your Company" className="pl-10" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="years_of_experience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Years in Business</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 5" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about yourself..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        <Button
          type="submit"
          className="w-full h-11 bg-[#FF4B4B] hover:bg-[#FF3333] text-white font-medium transition-colors duration-200"
          disabled={isLoading || form.formState.isSubmitting}
        >
          {(isLoading || form.formState.isSubmitting) ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Please wait...</span>
            </div>
          ) : (
            mode === "login" ? "Sign In" : "Create Account"
          )}
        </Button>
      </form>
    </Form>
  );
};