// AuthForm.tsx
import React, { useState } from 'react';
import { Mail, Lock, User } from 'lucide-react';

type AuthMode = 'login' | 'signup';

interface FormData {
  email: string;
  password: string;
  full_name: string;
  role: 'buyer' | 'miner';
}

interface AuthFormProps {
  mode: AuthMode;
  onSubmit?: (data: FormData) => void;
}

interface FormErrors {
  email?: string;
  password?: string;
  full_name?: string;
  role?: string;
}

// Base UI components
const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ 
  children, 
  className = '', 
  ...props 
}) => (
  <button 
    className={`px-4 py-2 rounded-md transition-colors ${className}`}
    {...props}
  >
    {children}
  </button>
);

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ 
  className = '', 
  ...props 
}) => (
  <input
    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 ${className}`}
    {...props}
  />
);

const FormLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <label className="block text-sm font-medium text-gray-700 mb-1">
    {children}
  </label>
);

const FormMessage: React.FC<{ message?: string }> = ({ message }) => (
  message ? <p className="text-sm text-red-500 mt-1">{message}</p> : null
);

const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = ({ 
  value, 
  onChange, 
  children,
  className = '',
  ...props
}) => (
  <select 
    value={value}
    onChange={onChange}
    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 ${className}`}
    {...props}
  >
    {children}
  </select>
);

export const AuthForm: React.FC<AuthFormProps> = ({ 
  mode = 'login', 
  onSubmit = console.log 
}) => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    full_name: '',
    role: 'buyer'
  });
  
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (mode === 'signup') {
      if (!formData.full_name || formData.full_name.length < 2) {
        newErrors.full_name = 'Name must be at least 2 characters';
      }
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md mx-auto p-6">
      {mode === "signup" && (
        <div>
          <FormLabel>Full Name</FormLabel>
          <div className="relative">
            <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              name="full_name"
              placeholder="John Doe"
              className="pl-10"
              value={formData.full_name}
              onChange={handleChange}
            />
          </div>
          <FormMessage message={errors.full_name} />
        </div>
      )}

      <div>
        <FormLabel>Email</FormLabel>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            name="email"
            type="email"
            placeholder="you@example.com"
            className="pl-10"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <FormMessage message={errors.email} />
      </div>

      <div>
        <FormLabel>Password</FormLabel>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            name="password"
            type="password"
            className="pl-10"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <FormMessage message={errors.password} />
      </div>

      {mode === "signup" && (
        <div>
          <FormLabel>I am a</FormLabel>
          <Select
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="buyer">Buyer</option>
            <option value="miner">Miner</option>
          </Select>
          <FormMessage message={errors.role} />
        </div>
      )}

      <Button
        type="submit"
        className="w-full h-11 bg-[#F2E2E2] hover:bg-red-100"
      >
        {mode === "login" ? "Sign In" : "Create Account"}
      </Button>
    </form>
  );
};

export default AuthForm;
