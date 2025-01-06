import React, { useState } from 'react';
import { Mail, Lock, User } from 'lucide-react';

interface AuthFormProps {
  mode: "login" | "signup";
  onSubmit: (data: FormData) => void;
  onModeChange: (mode: "login" | "signup") => void;
  disabled?: boolean;
}

interface FormData {
  email: string;
  password: string;
  full_name: string;
  role: 'buyer' | 'miner';
}

export const AuthForm = ({ mode, onSubmit, onModeChange, disabled }: AuthFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    full_name: '',
    role: 'buyer'
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    
    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters.';
    }
    
    if (mode === "signup" && formData.full_name.length < 2) {
      newErrors.full_name = 'Name must be at least 2 characters.';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
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
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              name="full_name"
              type="text"
              placeholder="John Doe"
              className="w-full rounded-md border border-gray-300 pl-10 py-2 focus:border-gray-500 focus:outline-none"
              value={formData.full_name}
              onChange={handleInputChange}
              disabled={disabled}
            />
          </div>
          {errors.full_name && (
            <p className="text-sm text-red-500">{errors.full_name}</p>
          )}
        </div>
      )}

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">
          Email
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            name="email"
            type="email"
            placeholder="you@example.com"
            className="w-full rounded-md border border-gray-300 pl-10 py-2 focus:border-gray-500 focus:outline-none"
            value={formData.email}
            onChange={handleInputChange}
            disabled={disabled}
          />
        </div>
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email}</p>
        )}
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            name="password"
            type="password"
            className="w-full rounded-md border border-gray-300 pl-10 py-2 focus:border-gray-500 focus:outline-none"
            value={formData.password}
            onChange={handleInputChange}
            disabled={disabled}
          />
        </div>
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password}</p>
        )}
      </div>

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
            disabled={disabled}
          >
            <option value="buyer">Buyer</option>
            <option value="miner">Miner</option>
          </select>
        </div>
      )}

      <button
        type="submit"
        disabled={disabled}
        className={`w-full h-11 bg-[#F2E2E2] hover:bg-[#F2E2E2]/90 rounded-md font-medium
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {disabled 
          ? "Processing..." 
          : mode === "login" 
            ? "Sign In" 
            : "Create Account"}
      </button>
    </form>
  );
};
