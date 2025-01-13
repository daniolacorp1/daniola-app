import React from 'react';
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/stores/useauthstore";
import { Eye, EyeOff } from "lucide-react";

// Form Schema
const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  full_name: z.string().optional(),
  role: z.enum(["buyer", "supplier"]).optional(),
  location: z.string().optional(),
  bio: z.string().optional(),
  commodities: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface AuthFormProps {
  type: "sign-in" | "sign-up";
}

export function AuthForm({ type }: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, signUp, isLoading } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      full_name: "",
      role: "buyer",
      location: "",
      bio: "",
      commodities: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    if (type === "sign-in") {
      await signIn(data);
    } else {
      await signUp(data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Input
          {...register("email")}
          type="email"
          placeholder="Email"
          className="w-full"
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <div className="relative">
          <Input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-gray-500" />
            ) : (
              <Eye className="h-4 w-4 text-gray-500" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      {type === "sign-up" && (
        <>
          <div className="space-y-2">
            <Input
              {...register("full_name")}
              placeholder="Full Name"
              className="w-full"
            />
            {errors.full_name && (
              <p className="text-sm text-red-500">{errors.full_name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <select {...register("role")} className="w-full p-2 rounded border">
              <option value="buyer">Buyer</option>
              <option value="supplier">Supplier</option>
            </select>
            {errors.role && (
              <p className="text-sm text-red-500">{errors.role.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Input
              {...register("location")}
              placeholder="Location"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <textarea
              {...register("bio")}
              placeholder="Bio"
              className="w-full p-2 rounded border"
            />
          </div>

          <div className="space-y-2">
            <Input
              {...register("commodities")}
              placeholder="Commodities (comma separated)"
              className="w-full"
            />
          </div>
        </>
      )}

      <Button
        type="submit"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : type === "sign-in" ? "Sign In" : "Sign Up"}
      </Button>
    </form>
  );
}