// src/components/auth/AuthForm.tsx
import React, { useState } from 'react';
import { Mail, Lock, User } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Type for form data
interface FormData {
  email: string;
  password: string;
  full_name: string;
  role: 'buyer' | 'miner';
}

interface AuthFormProps {
  mode: "login" | "signup";
  onSubmit?: (data: FormData) => void;
}

// Component for form fields with icon
const IconInput = ({ 
  icon: Icon, 
  name, 
  type, 
  placeholder, 
  value, 
  onChange, 
  error 
}: { 
  icon: React.ElementType;
  name: string;
  type: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}) => (
  <div className="space-y-1">
    <label className="text-sm font-medium text-gray-700">
      {name.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
    </label>
    <div className="relative">
      <Icon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-md border border-gray-300 pl-10 py-2 focus:border-gray-500 focus:outline-none"
        value={value}
        onChange={onChange}
      />
    </div>
    {error && <p className="text-sm text-red-500">{error}</p>}
  </div>
);

export const AuthForm = ({ mode, onSubmit }: AuthFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    full_name: '',
    role: 'buyer'
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    
    // Password validation
    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters.';
    }
    
    // Name validation (only for signup)
    if (mode === "signup" && formData.full_name.length < 2) {
      newErrors.full_name = 'Name must be at least 2 characters.';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit?.(formData);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {mode === "signup" && (
        <IconInput
          icon={User}
          name="full_name"
          type="text"
          placeholder="John Doe"
          value={formData.full_name}
          onChange={handleInputChange}
          error={errors.full_name}
        />
      )}

      <IconInput
        icon={Mail}
        name="email"
        type="email"
        placeholder="you@example.com"
        value={formData.email}
        onChange={handleInputChange}
        error={errors.email}
      />

      <IconInput
        icon={Lock}
        name="password"
        type="password"
        value={formData.password}
        onChange={handleInputChange}
        error={errors.password}
      />

      {mode === "signup" && (
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            I am a
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            className="w-full rounded-md border border-gray-300 py-2 px-3 focus:border-gray-500 focus:outline-none"
          >
            <option value="buyer">Buyer</option>
            <option value="miner">Miner</option>
          </select>
        </div>
      )}

      <button
        type="submit"
        className="w-full h-11 bg-[#F2E2E2] hover:bg-[#F2E2E2]/90 rounded-md font-medium"
      >
        {mode === "login" ? "Sign In" : "Create Account"}
      </button>
    </form>
  );
};
