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

  // ... rest of your validation logic remains the same ...

  return (
    <div className="space-y-6">
      <div className="flex space-x-2">
        <button
          type="button"
          disabled={disabled}
          className={`flex-1 py-2 ${mode === 'login' ? 'bg-gray-100' : 'bg-white'} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={() => onModeChange("login")}
        >
          Login
        </button>
        <button
          type="button"
          disabled={disabled}
          className={`flex-1 py-2 ${mode === 'signup' ? 'bg-gray-100' : 'bg-white'} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={() => onModeChange("signup")}
        >
          Sign Up
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* ... rest of your form fields remain the same ... */}

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
    </div>
  );
};
